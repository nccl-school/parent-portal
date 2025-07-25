import { z } from "zod/v4";
import type { Context } from "hono";

import {
  checkProfanity,
  zCleanStringSchema,
  zDateStringSchema,
  zFile,
} from "../../utils/util.schema.js";
import type { Resource as DBResource } from "../../_generated/prisma/client.js";
import { exhaustiveMatchGuard } from "../../utils/util.exhaustiveMatchGuard.js";
import { ErrorSet } from "../../utils/util.errors.js";

export const ResourceTypeSchema = z.literal([
  "FOLDER",
  "FILE",
  "LINK",
  "EXTERNAL_DOC",
]);

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
export const CreateFileResponseSchema = ResourceSchema.pick({
  id: true,
  slug: true,
  name: true,
  parentResourceId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateFileResponse = z.infer<typeof CreateFileResponseSchema>;

// --- Create a folder
export const CreateFolderRequestSchema = CreateResourceOwnershipLevel.and(
  z.object({
    name: checkProfanity(z.string("A folder name is required")),
    slug: checkProfanity(z.string("A slug is required")),
    parentResourceId: z.string().optional(),
  })
);
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
