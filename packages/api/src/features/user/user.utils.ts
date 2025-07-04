import { z } from "zod/v4";

import { zDateStringSchema } from "../../utils/util.schema.js";
import { RoleSchema, RolesSchema } from "../role/role.utils.js";

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
  role: RoleSchema,
});
export type User = z.infer<typeof UserSchema>;

// Get a list of users
export const GetUserListResponseSchema = UserSchema.array();
export type GetUserListResponse = z.infer<typeof GetUserListResponseSchema>;

// Create a user
export const CreateUserRequestSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
}).extend({ role: RolesSchema });
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

// Update a user role
export const UpdateUserRoleParamsSchema = z.object({
  id: z.string(),
});
export type UpdateUserRoleParams = z.infer<typeof UpdateUserRoleParamsSchema>;
export const UpdateUserRoleRequestSchema = z.object({
  role: RolesSchema,
});
export type UpdateUserRoleRequest = z.infer<typeof UpdateUserRoleRequestSchema>;
export const UpdateUserRoleResponseSchema = UserSchema;
export type UpdateUserRoleResponse = z.infer<
  typeof UpdateUserRoleResponseSchema
>;

// Invite Users
export const InviteUsersRequestSchema = z.object({
  email_addresses: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim()))
    .pipe(z.array(z.email({ pattern: z.regexes.html5Email }))),
  role: RolesSchema,
});
export type InviteUsersRequest = z.infer<typeof InviteUsersRequestSchema>;
export const InviteUsersResponseSchema = z.object({
  message: z.string(),
  userCount: z.number(),
});
export type InviteUsersResponse = z.infer<typeof InviteUsersResponseSchema>;
