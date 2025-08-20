import { Hono } from "hono";
import { ENV } from "@nccl/env";

import {
  CreateFileRequestSchema,
  CreateResourceResponseSchema,
  CreateFolderRequestSchema,
  CreateResourceAccessRuleRequestSchema,
  CreateResourceAccessRuleResponseSchema,
  DeleteResourceResponseSchema,
  GetFileListResponseSchema,
  GetResourceSchoolAccessRuleResponseSchema,
  GetResourceBreadcrumbResponseSchema,
  GetResourceResponseSchema,
  MoveResourceRequestSchema,
  MoveResourceResponseSchema,
  ParamsIDSchema,
  ResourceTreeSchema,
  UpdateResourceMetaRequestSchema,
  UpdateResourceMetaResponseSchema,
  type GetResourceBreadcrumbResponse,
  type ResourceTree,
  GetResourceUserAccessRulesResponseSchema,
  GetResourceOrgAccessRulesResponseSchema,
  UpdateResourceAccessRuleRequestSchema,
  UpdateResourceAccessRuleResponseSchema,
  DeleteResourceAccessRuleResponseSchema,
  CreateGoogleDocRequestSchema,
} from "./resource.schema.js";
import {
  getResourceById,
  getUserResourceAccess,
  getBucket,
  createFileStoragePath,
  createResourceOwnership,
  parseGoogleDocsURL,
  fetchGoogleDocMetadataFromGoogleDrive,
} from "./resource.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { serialize } from "../../utils/util.serialize.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import type { Resource } from "../../_generated/prisma/client.js";
import { tryPrisma } from "../../utils/util.prisma.js";
import { exhaustiveMatchGuard } from "../../utils/util.exhaustiveMatchGuard.js";

export const resource = new Hono();

// GET / api/resource/:id | Get a specific resource by ID
resource.get("/:id", validate("param", ParamsIDSchema), async (c) => {
  const { id } = c.req.valid("param");
  const record = await getResourceById(id, c);
  const json = await serialize(GetResourceResponseSchema, record);
  return c.json(json);
});

// DELETE /api/resource/:id | Delete a specific resource by ID
resource.delete("/:id", validate("param", ParamsIDSchema), async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  const [resource, canUser] = await getUserResourceAccess(id, c);

  if (!canUser.delete) {
    throw new ErrorSet.unauthorized(
      "You are not authorized to delete this resource."
    );
  }

  switch (resource.type) {
    case "FILE": {
      const transaction = db.$transaction(async (tx) => {
        await tx.resource.delete({ where: { id } });
        const bucket = getBucket();
        if (!resource.fileUrl) {
          throw new ErrorSet.serverError(
            "This resource is missing a pointer to bucket storage. This should not have happened. Please contact support."
          );
        }
        await bucket.file(resource.fileUrl).delete();
      });
      await tryPrisma(transaction, {
        fallback: "There was an error when trying to delete the resource",
      });
      const json = await serialize(DeleteResourceResponseSchema, {
        message: `Successfully deleted ${resource.name}.`,
      });
      return c.json(json);
    }

    case "EXTERNAL_DOC":
    case "LINK":
    case "FOLDER":
      throw new ErrorSet.methodNotAllowed(
        `DELETE is not allowed for this the ${resource.type} resource type at this time.`
      );

    default:
      return exhaustiveMatchGuard(resource.type);
  }
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
  const currentUser = c.get("user");
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

// PUT /api/resource/:id/meta | Update a resources meta information
resource.put(
  "/:id/meta",
  validate("param", ParamsIDSchema),
  validate("json", UpdateResourceMetaRequestSchema),
  async (c) => {
    const db = c.get("db");
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    const record = await db.resource.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description || null,
        slug: body.slug,
      },
      include: {
        childResources: true,
      },
    });
    const res = await serialize(UpdateResourceMetaResponseSchema, record);
    return c.json(res);
  }
);

// PUT /api/resource/:id/move | Update a resources parent
resource.put(
  "/:id/move",
  validate("param", ParamsIDSchema),
  validate("json", MoveResourceRequestSchema),
  async (c) => {
    const db = c.get("db");
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    const record = await db.resource.update({
      where: { id: params.id },
      data: {
        parentResourceId: body.parentResourceId,
      },
      include: {
        childResources: true,
      },
    });
    const res = await serialize(MoveResourceResponseSchema, record);
    return c.json(res);
  }
);

// POST api/resource | Upload a current user file
resource.post("/file", validate("form", CreateFileRequestSchema), async (c) => {
  const db = c.get("db");
  const { file, ...form } = c.req.valid("form");
  const parentResourceId = form.parentResourceId ?? "__ROOT__";

  // Wrap the creation and file URL update in a transaction
  const transaction = db.$transaction(async (tx) => {
    const node = await tx.resource.create({
      data: {
        name: form.name,
        type: "FILE",
        slug: form.slug,
        mimeType: file.type,
        ...createResourceOwnership(c, form),
        parentResourceId,
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
    unique_constraint_violation: `A file with a slug of "${form.slug}" has already been created for this "${parentResourceId}" parent resource. Please change the slug to a unique value.`,
    fallback: "An error occurred when trying to create the file",
  });

  if (!resource.fileUrl) {
    throw new ErrorSet.serverError(
      "A fileURL was not created for this file. This should not have happened."
    );
  }

  const bucket = getBucket();
  const buffer = await file.arrayBuffer();
  const blob = bucket.file(resource.fileUrl);
  await blob.save(Buffer.from(buffer), {
    contentType: file.type,
  });

  const data = await serialize(CreateResourceResponseSchema, resource);

  return c.json(data);
});

// POST /api/resource/google-doc | Create a new Google Doc
resource.post(
  "/google-doc",
  authorize(["ADMIN", "STAFF"]),
  validate("json", CreateGoogleDocRequestSchema),
  async (c) => {
    const { url, ...json } = c.req.valid("json");
    const db = c.get("db");
    const parentResourceId = json.parentResourceId ?? "__ROOT__";
    const googleDocParsed = parseGoogleDocsURL(url);
    const googleDocMeta = await fetchGoogleDocMetadataFromGoogleDrive(
      googleDocParsed.externalId,
      ENV.getOne("GOOGLE_CALENDAR_API_KEY")
    );

    const createGoogleDoc = db.resource.create({
      data: {
        ...googleDocMeta,
        type: "EXTERNAL_DOC",
        externalId: googleDocParsed.externalId,
        mimeType: googleDocParsed.mimeType,
        ...createResourceOwnership(c, json),
        parentResourceId,
      },
    });
    const googleDoc = await tryPrisma(createGoogleDoc, {
      fallback:
        "There was an error when trying to add the Google Doc into the system",
      unique_constraint_violation: `A Google Doc with the slug "${googleDocMeta.slug}" has already been added to the system. This most likely happened because you've already added this Google Doc in this folder.`,
    });

    const data = await serialize(CreateResourceResponseSchema, googleDoc);
    return c.json(data);
  }
);

// POST /api/resource/folder | Create a new folder
resource.post(
  "/folder",
  authorize(["ADMIN", "STAFF"]),
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

    const json = await serialize(CreateResourceResponseSchema, folder);
    return c.json(json);
  }
);

// GET /api/resource/:id/access/school | Get all school access rules for a resource
resource.get(
  "/:id/access/school",
  validate("param", ParamsIDSchema),
  authorize("ADMIN"),
  async (c) => {
    const db = c.get("db");
    const param = c.req.valid("param");
    const accessRule = await db.resourceAccessRule.findUnique({
      where: {
        resourceId_allSchool: {
          resourceId: param.id,
          allSchool: true,
        },
      },
    });
    const data = await serialize(
      GetResourceSchoolAccessRuleResponseSchema,
      accessRule
    );
    return c.json(data);
  }
);

// GET /api/resource/:id/user | Get all user access rules for a resource
// -- These are all of the users who are able to access the resource
resource.get(
  "/:id/access/user",
  validate("param", ParamsIDSchema),
  authorize("ADMIN"),
  async (c) => {
    const db = c.get("db");
    const param = c.req.valid("param");
    const rules = await db.resourceAccessRule.findMany({
      where: {
        resourceId: param.id,
        userId: {
          not: null,
        },
      },
    });
    const rulesWithUser = await Promise.all(
      rules.map(async (rule) => {
        if (!rule.userId) {
          throw new ErrorSet.serverError(
            "A user rule was located without a userId. This should not have happened. Please contact support."
          );
        }
        const user = await db.user.findUnique({
          where: { id: rule.userId },
          include: {
            role: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!user) {
          throw new ErrorSet.notFound(
            "The user who is granted access to this rule cannot be found. This should not have happened. Please contact support."
          );
        }
        const {
          role: { id: roleId },
          ...restUser
        } = user;
        return {
          ...rule,
          user: {
            ...restUser,
            roleId,
          },
        };
      })
    );
    const data = await serialize(
      GetResourceUserAccessRulesResponseSchema,
      rulesWithUser
    );

    return c.json(data);
  }
);

// GET /api/resource/:id/org | Get all org access rules for a resource
// -- These are all of the orgs who are able to access the resource
resource.get(
  "/:id/access/org",
  validate("param", ParamsIDSchema),
  authorize("ADMIN"),
  async (c) => {
    const db = c.get("db");
    const param = c.req.valid("param");
    const rules = await db.resourceAccessRule.findMany({
      where: {
        resourceId: param.id,
        orgId: {
          not: null,
        },
      },
    });
    const rulesWithOrg = await Promise.all(
      rules.map(async (rule) => {
        if (!rule.orgId) {
          throw new ErrorSet.serverError(
            "An org rule was located without an orgId. This should not have happened. Please contact support."
          );
        }
        const org = await db.organization.findUnique({
          where: { id: rule.orgId },
        });
        if (!org) {
          throw new ErrorSet.notFound(
            "The org that is granted access to this rule cannot be found. This should not have happened. Please contact support."
          );
        }
        return {
          ...rule,
          org: {
            id: org.id,
          },
        };
      })
    );

    const data = await serialize(
      GetResourceOrgAccessRulesResponseSchema,
      rulesWithOrg
    );

    return c.json(data);
  }
);

// POST /api/resource/:id/access | Create an access rule for the resource
resource.post(
  "/:id/access",
  validate("param", ParamsIDSchema),
  validate("json", CreateResourceAccessRuleRequestSchema),
  async (c) => {
    const db = c.get("db");
    const { id: resourceId } = c.req.valid("param");
    const body = c.req.valid("json");

    let res;
    switch (body.level) {
      case "USER": {
        res = await db.resourceAccessRule.create({
          data: {
            resourceId,
            permission: body.permission,
            userId: body.userId,
          },
        });
        break;
      }

      case "ORG": {
        res = await db.resourceAccessRule.create({
          data: {
            resourceId,
            permission: body.permission,
            orgId: body.orgId,
          },
        });
        break;
      }

      case "SCHOOL": {
        res = await db.resourceAccessRule.create({
          data: {
            resourceId,
            permission: body.permission,
            allSchool: true,
          },
        });
        break;
      }

      default:
        return exhaustiveMatchGuard(body);
    }

    const data = await serialize(CreateResourceAccessRuleResponseSchema, res);
    return c.json(data);
  }
);

// PUT / api/resources/access/:id | Update a resource access rule
resource.put(
  "/access/:id",
  validate("param", ParamsIDSchema),
  validate("json", UpdateResourceAccessRuleRequestSchema),
  async (c) => {
    const db = c.get("db");
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const updatedRule = await db.resourceAccessRule.update({
      where: { id },
      data: body,
    });
    const data = await serialize(
      UpdateResourceAccessRuleResponseSchema,
      updatedRule
    );
    return c.json(data);
  }
);

// DELETE /api/resource/access/:id | Delete a resource access rule
resource.delete("/access/:id", validate("param", ParamsIDSchema), async (c) => {
  const db = c.get("db");
  const { id } = c.req.valid("param");
  await db.resourceAccessRule.delete({ where: { id } });
  const data = await serialize(DeleteResourceAccessRuleResponseSchema, {
    message: "Successfully delete resource access rule",
  });
  return c.json(data);
});
