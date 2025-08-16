import { z } from "zod";

import { zDateStringSchema } from "../../utils/util.schema.js";
import { RolesSchema } from "../role/role.utils.js";

export const UserStatusSchema = z.literal(["INVITED", "ACTIVE", "DISABLED"]);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  emailVerified: z.boolean(),
  imageUrl: z.string().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable(),
  isSuper: z.boolean().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});
export type User = z.infer<typeof UserSchema>;

// Get Current user
export const GetCurrentUserResponseSchema = z.object({
  ...UserSchema.shape,
  roleId: RolesSchema,
});
export type GetCurrentUserResponse = z.infer<
  typeof GetCurrentUserResponseSchema
>;

// Get a list of users
export const GetUserListResponseSchema = UserSchema.array();
export type GetUserListResponse = z.infer<typeof GetUserListResponseSchema>;

// Get a user
export const GetUserParamsSchema = UserSchema.pick({ id: true });
export const GetUserResponseSchema = z.object({
  ...UserSchema.shape,
  roleId: RolesSchema,
});
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

// Create a user
export const CreateUserRequestSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
}).extend({ role: RolesSchema });

// Update a user role
export const UpdateUserRoleParamsSchema = z.object({
  id: z.string(),
});
export const UpdateUserRoleRequestSchema = z.object({
  role: RolesSchema,
});
export const UpdateUserRoleResponseSchema = UserSchema;
export type UpdateUserRoleResponse = z.infer<
  typeof UpdateUserRoleResponseSchema
>;
