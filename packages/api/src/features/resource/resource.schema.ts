import { z } from "zod";

import {
  checkProfanity,
  zCleanStringSchema,
  zDateStringSchema,
  zFile,
  zMessageSchema,
  zStringRequired,
} from "../../utils/util.schema.js";
import { GetUserResponseSchema } from "../user/user.utils.js";

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
  description: zCleanStringSchema.nullable(),
  type: ResourceTypeSchema,
  parentResourceId: z.string(),
  ownerOrgId: z.string().nullable(),
  ownerUserId: z.string().nullable(),
  mimeType: z.string().nullable(),
  fileUrl: z.string().nullable(),
  externalSource: z.string().nullable(),
  externalId: z.string().nullable(),
  linkType: z.string().nullable(),
  linkTargetId: z.string().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});
export type Resource = z.infer<typeof ResourceSchema>;

export const ResourceAccessRulePermissionSchema = z.literal([
  "VIEWER",
  "EDITOR",
  "MANAGER",
]);
export const resourceAccessPermissions = {
  viewer: "VIEWER",
  editor: "EDITOR",
  manager: "MANAGER",
} as const;
export type ResourceAccessRulePermission = z.infer<
  typeof ResourceAccessRulePermissionSchema
>;

export const ResourceAccessRuleSchema = z.object({
  id: z.string(),
  resourceId: z.string(),
  permission: ResourceAccessRulePermissionSchema,
  userId: z.string().nullable(),
  orgId: z.string().nullable(),
  allSchool: z.boolean().nullable().default(false),
  createdAt: zDateStringSchema,
});
export type ResourceAccessRule = z.infer<typeof ResourceAccessRuleSchema>;

// -- Utils
export const ParamsIDSchema = z.object({ id: z.string() });
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
  description: true,
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

// --- Create a Google Doc
export const CreateGoogleDocRequestSchema = CreateResourceOwnershipLevel.and(
  z.object({
    url: z.url(),
    parentResourceId: z.string().optional(),
  })
);
export type CreateGoogleDocRequest = z.infer<
  typeof CreateGoogleDocRequestSchema
>;

// --- Delete a resource
export const DeleteResourceResponseSchema = zMessageSchema;
export type DeleteResourceResponse = z.infer<
  typeof DeleteResourceResponseSchema
>;

// --- Create a folder
export const CreateFolderRequestSchema = CreateResourceOwnershipLevel.and(
  z.object({
    name: zStringRequired("A folder name is required"),
    slug: zStringRequired("A slug is required"),
    parentResourceId: z.string().optional(),
  })
);
export type CreateFolderRequest = z.infer<typeof CreateFolderRequestSchema>;

export const CreateResourceResponseSchema = ResourceSchema.pick({
  id: true,
  slug: true,
  name: true,
  parentResourceId: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateResourceResponse = z.infer<
  typeof CreateResourceResponseSchema
>;

// --- Update meta
export const UpdateResourceMetaRequestSchema = ResourceSchema.pick({
  name: true,
  description: true,
  slug: true,
});
export type UpdateResourceMetaRequest = z.infer<
  typeof UpdateResourceMetaRequestSchema
>;
export const UpdateResourceMetaResponseSchema = GetResourceResponseSchema;
export type UpdateResourceMetaResponse = z.infer<
  typeof UpdateResourceMetaResponseSchema
>;

// --- Move resource
export const MoveResourceRequestSchema = ResourceSchema.pick({
  parentResourceId: true,
});
export type MoveResourceRequest = z.infer<typeof MoveResourceRequestSchema>;
export const MoveResourceResponseSchema = GetResourceResponseSchema;
export type MoveResourceResponse = z.infer<typeof MoveResourceResponseSchema>;

// -- Get a resource school access rule
export const GetResourceSchoolAccessRuleResponseSchema =
  ResourceAccessRuleSchema.nullable();
export type GetResourceSchoolAccessRuleResponse = z.infer<
  typeof GetResourceSchoolAccessRuleResponseSchema
>;

// -- Get a resource's user access rules
export const GetResourceUserAccessRulesResponseSchema = z
  .object({
    ...ResourceAccessRuleSchema.shape,
    user: GetUserResponseSchema,
  })
  .array();
export type GetResourceUserAccessRulesResponse = z.infer<
  typeof GetResourceUserAccessRulesResponseSchema
>;

// -- Get a resource's org access rules
export const GetResourceOrgAccessRulesResponseSchema = z
  .object({
    ...ResourceAccessRuleSchema.shape,
    org: {
      id: z.string(),
    },
  })
  .array();
export type GetResourceOrgAccessRulesResponse = z.infer<
  typeof GetResourceOrgAccessRulesResponseSchema
>;

// --- Create an access rule
export const CreateResourceAccessRuleRequestSchema = z
  .discriminatedUnion("level", [
    z.object({ level: z.literal("USER"), userId: z.string() }),
    z.object({ level: z.literal("ORG"), orgId: z.string() }),
    z.object({ level: z.literal("SCHOOL") }),
  ])
  .and(
    z.object({
      permission: ResourceAccessRulePermissionSchema,
    })
  );
export type CreateResourceAccessRuleRequest = z.infer<
  typeof CreateResourceAccessRuleRequestSchema
>;
export const CreateResourceAccessRuleResponseSchema = ResourceAccessRuleSchema;
export type CreateResourceAccessRuleResponse = z.infer<
  typeof CreateResourceAccessRuleResponseSchema
>;

// --- Update an access rule
export const UpdateResourceAccessRuleRequestSchema = z.object({
  permission: ResourceAccessRulePermissionSchema,
});
export type UpdateResourceAccessRuleRequest = z.infer<
  typeof UpdateResourceAccessRuleRequestSchema
>;
export const UpdateResourceAccessRuleResponseSchema = ResourceAccessRuleSchema;
export type UpdateResourceAccessRuleResponse = z.infer<
  typeof UpdateResourceAccessRuleResponseSchema
>;

// --- Delete an access rule
export const DeleteResourceAccessRuleResponseSchema = zMessageSchema;
export type DeleteResourceAccessRuleResponse = z.infer<
  typeof DeleteResourceAccessRuleResponseSchema
>;
