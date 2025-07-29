import { z } from "zod/v4";
import type { Context } from "hono";
import { Storage } from "@google-cloud/storage";

import {
  checkProfanity,
  zCleanStringSchema,
  zDateStringSchema,
  zFile,
  zMessageSchema,
  zString,
} from "../../utils/util.schema.js";
import type { Resource as DBResource } from "../../_generated/prisma/client.js";
import { exhaustiveMatchGuard } from "../../utils/util.exhaustiveMatchGuard.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { getEnvVar } from "../../utils/util.envVar.js";

export const ResourceTypeSchema = z.literal([
  "FOLDER",
  "FILE",
  "LINK",
  "EXTERNAL_DOC",
]);
export type ResourceType = z.infer<typeof ResourceTypeSchema>;

// Base Schema
export const ResourceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: zCleanStringSchema,
  type: ResourceTypeSchema,
  parentResourceId: z.string(),
  ownerOrgId: z.string().nullable(),
  ownerUserId: z.string().nullable(),
  mimeType: z.string().nullable(),
  fileUrl: z.string().nullable(),
  externalSource: z.string().nullable(),
  externalId: z.string().nullable(),
  webViewLink: z.string().nullable(),
  exportLink: z.string().nullable(),
  linkType: z.string().nullable(),
  linkTargetId: z.string().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});
export type Resource = z.infer<typeof ResourceSchema>;

// -- Utils
export const ResourceIDParamsSchema = z.object({ id: z.string() });
export const CreateResourceOwnershipLevel = z.discriminatedUnion(
  "owner",
  [
    z.object({
      owner: z.literal("currentUser"),
    }),
    z.object({
      owner: z.literal("user"),
      userId: z.string({
        error: "A user ID is required to enable user level ownership",
      }),
    }),
    z.object({
      owner: z.literal("org"),
      orgId: z.string({
        error: "An org ID is required to enable org level ownership",
      }),
    }),
    z.object({ owner: z.literal("school") }),
  ],
  {
    error:
      "You must indicate an owner of the resource. Please pick from 'currentUser', 'user', 'org', or 'school'.",
  }
);

/**
 * Utility function to parse the owner key in any POST
 * resource object to determine what entity should own
 * the resource.
 */
export function createResourceOwnership<
  C extends Context,
  T extends z.infer<typeof CreateResourceOwnershipLevel>,
>(c: C, data: T): Partial<DBResource> {
  const currentUser = c.get("currentUser");

  switch (data.owner) {
    case "currentUser":
      return { ownerUserId: currentUser.id, ownerOrgId: null };

    case "user":
      return { ownerUserId: data.userId, ownerOrgId: null };

    case "org":
      return { ownerOrgId: data.orgId, ownerUserId: null };

    case "school":
      return { ownerOrgId: null, ownerUserId: null };

    default:
      return exhaustiveMatchGuard(data);
  }
}

/**
 * Creates a storage URL for the file that is created inside of GCS
 * based upon the owner level
 */
export function createFileStoragePath<
  C extends Context,
  T extends z.infer<typeof CreateResourceOwnershipLevel>,
>(
  c: C,
  { file, data, resource }: { resource: DBResource; data: T; file: File }
): string {
  if (resource.type !== "FILE") {
    throw new ErrorSet.badRequest(
      `Unable to blob artifact for a "${resource.type}" type`
    );
  }
  switch (data.owner) {
    case "currentUser": {
      const currentUser = c.get("currentUser");
      return `user_${currentUser.id}/${resource.id}/${file.name}`;
    }

    case "user":
      return `user_${data.userId}/${resource.id}/${file.name}`;

    case "org":
      return `org_${data.orgId}/${resource.id}/${file.name}`;

    case "school":
      return `school/${resource.id}/${file.name}`;

    default:
      return exhaustiveMatchGuard(data);
  }
}
// -- Get a resource tree
export const ResourceTreeSchema: z.ZodType<Record<string, ResourceTreeNode>> =
  z.lazy(() =>
    z.record(
      z.string(),
      z.object({
        ...ResourceSchema.shape,
        children: ResourceTreeSchema.optional(),
      })
    )
  );
export type ResourceTreeNode = z.infer<typeof ResourceSchema> & {
  children?: Record<string, ResourceTreeNode>;
};
export type ResourceTree = z.infer<typeof ResourceTreeSchema>;

// --- Get a Resource
const GetSchema = ResourceSchema.pick({
  id: true,
  slug: true,
  name: true,
  type: true,
  parentResourceId: true,
  mimeType: true,
  ownerOrgId: true,
  ownerUserId: true,
  createdAt: true,
  updatedAt: true,
});
export const GetResourceResponseSchema = z.object({
  ...GetSchema.shape,
  childResources: GetSchema.array(),
});
export type GetResourceResponse = z.infer<typeof GetResourceResponseSchema>;

export const GetResourceListResponseSchema = GetResourceResponseSchema.array();
export const GetFileListResponseSchema = GetResourceResponseSchema.omit({
  childResources: true,
}).array();

// --- Get a breadcrumb by path
export const GetResourceBreadcrumbResponseSchema = z
  .object({
    ...ResourceSchema.pick({
      id: true,
      name: true,
      slug: true,
    }).shape,
    pathSegments: z.string().array(),
  })
  .array();
export type GetResourceBreadcrumbResponse = z.infer<
  typeof GetResourceBreadcrumbResponseSchema
>;

// --- Create a file
export const CreateFileRequestSchema = CreateResourceOwnershipLevel.and(
  z.object({
    file: zFile,
    name: checkProfanity(z.string("A file name is required")),
    slug: checkProfanity(z.string("A slug is required")),
    parentResourceId: z.string().optional(),
  })
);
export type CreateFileRequest = z.infer<typeof CreateFileRequestSchema>;
export const CreateFileResponseSchema = ResourceSchema.pick({
  id: true,
  slug: true,
  name: true,
  parentResourceId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateFileResponse = z.infer<typeof CreateFileResponseSchema>;

// --- Delete a resource
export const DeleteResourceResponseSchema = zMessageSchema;
export type DeleteResourceResponse = z.infer<
  typeof DeleteResourceResponseSchema
>;

// --- Create a folder
export const CreateFolderRequestSchema = CreateResourceOwnershipLevel.and(
  z.object({
    name: zString({ required: "A folder name is required" }),
    slug: zString({ required: "A slug is required" }),
    parentResourceId: z.string().optional(),
  })
);
export type CreateFolderRequest = z.infer<typeof CreateFolderRequestSchema>;
export const CreateFolderResponseSchema = ResourceSchema.pick({
  id: true,
  slug: true,
  name: true,
  parentResourceId: true,
  ownerOrgId: true,
  ownerUserId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateFolderResponse = z.infer<typeof CreateFolderResponseSchema>;

// functions

export function getBucket<C extends Context>(c: C) {
  const { GCP_CLOUD_STORAGE_BUCKET } = getEnvVar(c);
  const storage = new Storage(); // uses local credentials
  const bucket = storage.bucket(GCP_CLOUD_STORAGE_BUCKET);
  return bucket;
}

export async function getResourceById<C extends Context>(
  id: string,
  c: C,
  options?: { includeAccessRules: boolean }
) {
  const includeAccessRules = options?.includeAccessRules ?? false;
  const db = c.get("db");
  const record = await db.resource.findUnique({
    where: { id },
    include: { childResources: true, accessRules: includeAccessRules },
  });
  if (!record) {
    throw new ErrorSet.notFound("Unable to find the requested resource");
  }

  return record;
}

type ResourceAccessRules = {
  read: true;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export async function getUserResourceAccess<C extends Context>(
  id: string,
  c: C
): Promise<[DBResource, ResourceAccessRules]> {
  const currentUser = c.get("currentUser");
  const db = c.get("db");

  const [resource, orgMemberships] = await Promise.all([
    getResourceById(id, c, { includeAccessRules: true }),
    db.organizationMembership.findMany({
      where: {
        userId: currentUser.id,
      },
    }),
  ]);

  const base = {
    read: true,
    create: false,
    update: false,
    delete: false,
  } as const;

  function createResponse(
    data: ResourceAccessRules
  ): [DBResource, ResourceAccessRules] {
    return [resource, data];
  }

  // ✅ 1. System-level admin always has full access
  if (currentUser.roleId === "ADMIN") {
    return createResponse({
      read: true,
      create: true,
      update: true,
      delete: true,
    });
  }

  // ✅ 2. Direct user ownership
  if (currentUser.id === resource.ownerUserId) {
    return createResponse({
      read: true,
      create: true,
      update: true,
      delete: true,
    });
  }

  // ✅ 3. Match effective access rules
  for (const rule of resource.accessRules) {
    const isDirectUser = rule.userId === currentUser.id;
    const isSchoolWide = rule.isPublic === true;

    const hasMatchingOrgMembership = orgMemberships.find((membership) => {
      const matchesOrgWide =
        rule.orgWide && membership.organizationId === resource.ownerOrgId;
      const matchesRole =
        rule.orgRole &&
        membership.organizationId === resource.ownerOrgId &&
        membership.role === rule.orgRole;

      return matchesOrgWide || matchesRole;
    });

    if (isDirectUser || isSchoolWide || hasMatchingOrgMembership) {
      switch (rule.permission) {
        case "MANAGER":
          return createResponse({
            read: true,
            create: true,
            update: true,
            delete: true,
          });
        case "EDITOR":
          return createResponse({
            read: true,
            create: false,
            update: true,
            delete: false,
          });
        case "VIEWER":
          return createResponse({
            read: true,
            create: false,
            update: false,
            delete: false,
          });
      }
    }
  }

  // ❌ 4. No matching rule = read-only
  return createResponse(base);
}
