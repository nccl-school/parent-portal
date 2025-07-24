import { Hono, type Context } from "hono";
import { Storage } from "@google-cloud/storage";

import {
  CreateFileRequestSchema,
  CreateFileResponseSchema,
  createFileStoragePath,
  CreateFolderRequestSchema,
  CreateFolderResponseSchema,
  createResourceOwnership,
  GetFileListResponseSchema,
  GetResourceBreadcrumbResponseSchema,
  GetResourceResponseSchema,
  ResourceIDParamsSchema,
  ResourceTreeSchema,
  type GetResourceBreadcrumbResponse,
  type ResourceTree,
} from "./resource.utils.js";

import { getEnvVar } from "../../utils/util.envVar.js";
import { validate } from "../../middleware/middleware.validate.js";
import { serialize } from "../../utils/util.serialize.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import type { Resource } from "../../_generated/prisma/client.js";
import { tryPrisma } from "../../utils/util.prisma.js";

function getBucket<C extends Context>(c: C) {
  const { GCP_CLOUD_STORAGE_BUCKET } = getEnvVar(c);
  const storage = new Storage(); // uses local credentials
  const bucket = storage.bucket(GCP_CLOUD_STORAGE_BUCKET);
  return bucket;
}

export const resource = new Hono();

// GET / api/resource/:id | Get a specific resource by ID
resource.get("/:id", validate("param", ResourceIDParamsSchema), async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const record = await db.resource.findUnique({
    where: { id: id },
    include: { childResources: true },
  });
  if (!record) {
    throw new ErrorSet.notFound("Unable to find the requested resource");
  }
  const json = await serialize(GetResourceResponseSchema, record);
  return c.json(json);
});

// GET / api/resource/path/* | Get a specific resource by its slug path
resource.get("/path/:path{.+}", async (c) => {
  const db = c.get("db");
  const fullPath = c.req.param("path") ?? "__ROOT__"; // e.g. "folder-1/folder-1-1"
  const slugParams = fullPath.split("/");

  let resource: Resource | undefined = undefined;
  async function findResource(parentResourceId: string, slugs: string[]) {
    const record = await db.resource.findUnique({
      where: {
        slug_parentResourceId: {
          parentResourceId,
          slug: slugs[0],
        },
      },
      include: {
        childResources: {
          where: {
            NOT: {
              id: "__ROOT__",
            },
          },
        },
      },
    });
    if (!record) {
      throw new ErrorSet.notFound(
        `Unable to find the request resource at path: ${fullPath}`
      );
    }
    resource = record;
    const [_, ...restSlugs] = slugs;
    if (restSlugs.length === 0) return;
    await findResource(record.id, restSlugs);
  }

  await findResource("__ROOT__", slugParams);

  if (!resource) {
    throw new ErrorSet.notFound(
      `Unable to find the requested resource at path: ${fullPath}`
    );
  }

  const json = await serialize(GetResourceResponseSchema, resource);
  return c.json(json);
});

// GET /api/resource/breadcrumb/path/* | Get the breadcrumb for the path
resource.get("/breadcrumb/:path{.+}", async (c) => {
  const db = c.get("db");
  const fullPath = c.req.param("path") ?? ""; // e.g. "folder-1/folder-1-1"
  const slugs = fullPath.split("/");

  const crumbs: GetResourceBreadcrumbResponse = [];

  async function findResource(parentResourceId: string, slugIndex = 0) {
    const slug = slugs[slugIndex];
    if (!slug) return;

    const resource = await db.resource.findUnique({
      where: {
        slug_parentResourceId: {
          parentResourceId,
          slug,
        },
      },
    });

    if (!resource) {
      throw new ErrorSet.notFound(
        `Unable to find the requested resource by slug: ${slug}`
      );
    }

    const { id, name } = resource;

    crumbs.push({
      id,
      name,
      slug,
      pathSegments: [...slugs.slice(0, slugIndex + 1)],
    });

    await findResource(id, slugIndex + 1);
  }

  await findResource("__ROOT__");

  const data = await serialize(GetResourceBreadcrumbResponseSchema, crumbs);
  return c.json(data);
});

// GET / api/resource/tree/* | Get a specific resource tree by its slug path
resource.get("/tree/:path{.+}", async (c) => {
  const db = c.get("db");
  const fullPath = c.req.param("path") ?? ""; // e.g. "folder-1/folder-1-1"
  const slugParams = fullPath.split("/");

  const resourceTree: ResourceTree = {};

  async function findResource(
    parentResourceId: string,
    slugs: string[],
    currentLeaf: ResourceTree = resourceTree
  ) {
    const getLevelRecords = db.resource.findMany({
      where: {
        parentResourceId,
        NOT: {
          id: "__ROOT__",
        },
      },
    });
    const getRecord = db.resource.findUnique({
      where: {
        slug_parentResourceId: {
          parentResourceId,
          slug: slugs[0],
        },
      },
      include: {
        childResources: true,
      },
    });

    const [levelRecords, record] = await Promise.all([
      getLevelRecords,
      getRecord,
    ]);

    if (!record) {
      throw new ErrorSet.notFound(
        `Unable to find the request resource at path: ${fullPath}`
      );
    }

    for (const levelRecord of levelRecords) {
      if (levelRecord.id === record.id && record.childResources.length > 0) {
        currentLeaf[levelRecord.id] = {
          ...levelRecord,
          children: record.childResources.reduce<ResourceTree>(
            (accum, record) => Object.assign(accum, { [record.id]: record }),
            {}
          ),
        };
      } else {
        currentLeaf[levelRecord.id] = levelRecord;
      }
    }

    const [_, ...restSlugs] = slugs;
    if (restSlugs.length === 0) return;
    if (record.childResources.length === 0) return;
    await findResource(record.id, restSlugs, currentLeaf[record.id].children);
  }

  await findResource("__ROOT__", slugParams);

  const data = await serialize(ResourceTreeSchema, resourceTree);

  return c.json(data);
});

// GET /api/resource/file/current | Get a list of files owned by the current user
resource.get("/file/current", async (c) => {
  const db = c.get("db");
  const currentUser = c.get("currentUser");
  const records = await db.resource.findMany({
    where: {
      type: "FILE",
      ownerUserId: currentUser.id,
    },
    include: {
      childResources: true,
    },
  });

  const data = await serialize(GetFileListResponseSchema, records);
  return c.json(data);
});

// POST api/resource | Upload a current user file
resource.post("/file", validate("form", CreateFileRequestSchema), async (c) => {
  const db = c.get("db");
  const { file, ...form } = c.req.valid("form");

  // Wrap the creation and file URL update in a transaction
  const transaction = db.$transaction(async (tx) => {
    const node = await tx.resource.create({
      data: {
        name: form.name,
        type: "FILE",
        slug: form.slug,
        mimeType: file.type,
        ...createResourceOwnership(c, form),
        parentResourceId: "__ROOT__",
      },
    });

    const fileUrl = createFileStoragePath(c, {
      resource: node,
      data: form,
      file,
    });

    const updatedNode = await tx.resource.update({
      where: { id: node.id },
      data: { fileUrl },
    });
    return updatedNode;
  });

  const resource = await tryPrisma(transaction, {
    unique_constraint_violation: `A file with a slug of "${form.slug}" has already been created for this this parent resource. Please change the slug to a unique value.`,
    fallback: "An error occurred when trying to create the file",
  });

  if (!resource.fileUrl) {
    throw new ErrorSet.serverError(
      "A fileURL was not created for this file. This should not have happened."
    );
  }

  const bucket = getBucket(c);
  const buffer = await file.arrayBuffer();
  const blob = bucket.file(resource.fileUrl);
  await blob.save(Buffer.from(buffer), {
    contentType: file.type,
  });

  const data = await serialize(CreateFileResponseSchema, resource);

  return c.json(data);
});

// POST /api/resource/folder | Create a new folder
resource.post(
  "/folder",
  authorize("ADMIN"),
  validate("json", CreateFolderRequestSchema),
  async (c) => {
    const db = c.get("db");
    const body = c.req.valid("json");

    const createFolder = db.resource.create({
      data: {
        name: body.name,
        parentResourceId: body.parentResourceId ?? "__ROOT__",
        slug: body.slug,
        type: "FOLDER",
        ...createResourceOwnership(c, body),
      },
    });

    const folder = await tryPrisma(createFolder, {
      unique_constraint_violation: `A folder with the slug of "${body.slug}" already exists for this folder. Please change the slug name of the folder.`,
      fallback: "An error occurred when trying to create the folder",
      fk_violation:
        body.owner === "user"
          ? "The 'userId' you have entered is invalid"
          : "The 'orgId' you have entered is invalid",
    });

    const json = await serialize(CreateFolderResponseSchema, folder);
    return c.json(json);
  }
);
