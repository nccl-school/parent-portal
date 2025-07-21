import { Hono, type Context } from "hono";
import { Storage } from "@google-cloud/storage";

import {
  CreateFileRequestSchema,
  CreateFileResponseSchema,
  CreateFolderRequestSchema,
  CreateFolderResponseSchema,
  GetResourceResponseSchema,
  ResourceIDParamsSchema,
} from "./resource.utils.js";

import { getEnvVar } from "../../utils/util.envVar.js";
import { validate } from "../../middleware/middleware.validate.js";
import { serialize } from "../../utils/util.serialize.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import type { Resource } from "../../_generated/prisma/client.js";

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
resource.get("/path/*", async (c) => {
  const db = c.get("db");
  const fullPath = c.req.param("*") ?? ""; // e.g. "folder-1/folder-1-1"
  const slugParams = fullPath.split("/");

  if (slugParams.length === 0) {
    throw new ErrorSet.badRequest("At least 1 path slug is required");
  }

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
        childResources: true,
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
    findResource(record.parentResourceId, restSlugs);
  }

  findResource("__ROOT__", slugParams);

  if (!resource) {
    throw new ErrorSet.notFound(
      `Unable to find the request resource at path: ${fullPath}`
    );
  }

  const json = await serialize(GetResourceResponseSchema, resource);
  return c.json(json);
});

// GET /api/resource/file/current | Get a list of files owned by the current user
// TODO: Add serializer
resource.get("/file/current", async (c) => {
  const db = c.get("db");
  const currentUser = c.get("currentUser");
  const resources = await db.resource.findMany({
    where: {
      type: "FILE",
      ownerUserId: currentUser.id,
    },
  });
  return c.json(resources);

  //   const data = await serialize()
  //   return c.json(data);
});

// POST api/resource | Upload a current user file
resource.post(
  "/file/current",
  validate("form", CreateFileRequestSchema),
  async (c) => {
    const db = c.get("db");
    const { file, ...form } = c.req.valid("form");
    const currentUser = c.get("currentUser");

    // Wrap the creation and file URL update in a transaction
    const resource = await db.$transaction(async (tx) => {
      const node = await tx.resource.create({
        data: {
          name: form.name,
          type: "FILE",
          slug: form.slug,
          mimeType: file.type,
          ownerUserId: currentUser.id, // make the owner of this file a specific owner,
          parentResourceId: "__ROOT__",
          accessRules: {
            create: {
              permission: "MANAGER",
              userId: currentUser.id,
            },
          },
        },
      });

      const storagePath = `user_${currentUser.id}/${node.id}/${file.name}`;

      const updatedNode = await tx.resource.update({
        where: {
          id: node.id,
        },
        data: {
          fileUrl: storagePath,
        },
      });
      return updatedNode;
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
  }
);

// POST /api/resource/folder | Create a new folder
resource.post(
  "/folder",
  authorize("ADMIN"),
  validate("json", CreateFolderRequestSchema),
  async (c) => {
    const db = c.get("db");
    const body = c.req.valid("json");

    const record = await db.resource.create({
      data: {
        name: body.name,
        parentResourceId: body.parentResourceId ?? "__ROOT__",
        slug: body.slug,
        type: "FOLDER",
        ownerOrgId:
          body.ownership.level === "org" ? body.ownership.orgId : null,
        ownerUserId:
          body.ownership.level === "user" ? body.ownership.userId : null,
      },
    });
    const json = await serialize(CreateFolderResponseSchema, record);
    return c.json(json);
  }
);
