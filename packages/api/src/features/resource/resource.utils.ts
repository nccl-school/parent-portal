import { z } from "zod/v4";

import {
  checkProfanity,
  zCleanStringSchema,
  zDateStringSchema,
  zFile,
} from "../../utils/util.schema.js";
import type { Resource as DBResource } from "../../_generated/prisma/client.js";

export type DBResourceTreeNode = DBResource & {
  children: { [key: string]: DBResourceTreeNode };
};
export type DBResourceTree = { [key: string]: DBResourceTreeNode };

export const ResourceTypeSchema = z.literal([
  "FOLDER",
  "FILE",
  "LINK",
  "EXTERNAL_DOC",
]);

export const ResourceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: zCleanStringSchema,
  type: ResourceTypeSchema,
  parentResourceId: z.string().nullable(),
  ownerOrgId: z.string().nullable(),
  ownerUserId: z.string().nullable(),
  mimeType: z.string(),
  fileUrl: z.string().nullable(),
  externalSource: z.string(),
  externalId: z.string().nullable(),
  webViewLink: z.string().nullable(),
  exportLink: z.string().nullable(),
  linkType: z.string().nullable(),
  linkTargetId: z.string().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});

export const ResourceIDParamsSchema = z.object({ id: z.string() });

// --- Create a file
export const CreateFileRequestSchema = z.object({
  file: zFile,
  name: checkProfanity(z.string("A file name is required")),
  slug: checkProfanity(z.string("A slug is required")),
});
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
export const CreateFolderRequestSchema = z.object({
  name: checkProfanity(z.string("A folder name is required")),
  slug: checkProfanity(z.string("A slug is required")),
  parentResourceId: z.string().nullable(),
  ownership: z.discriminatedUnion("level", [
    z.object({
      level: z.literal("user"),
      userId: z.string(),
    }),
    z.object({
      level: z.literal("org"),
      orgId: z.string(),
    }),
    z.object({ level: z.literal("school") }),
  ]),
});
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

// --- Get a resource and direct decedents
const GetSchema = ResourceSchema.pick({
  id: true,
  slug: true,
  name: true,
  type: true,
  parentResourceId: true,
  ownerOrgId: true,
  ownerUserId: true,
  createdAt: true,
  updatedAt: true,
});
export const GetResourceResponseSchema = z.object({
  ...GetSchema.shape,
  childResources: GetSchema.array(),
});
