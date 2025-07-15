import { z } from "zod/v4";

import { zDateStringSchema, zMessageSchema } from "../../utils/util.schema.js";
import { RoleSchema, RolesSchema } from "../role/role.utils.js";

export const UserStatusSchema = z.literal(["INVITED", "ACTIVE", "DISABLED"]);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  authId: z.string().nullable(),
  imageUrl: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
  status: UserStatusSchema,
  invitationId: z.string().nullable(),
  role: RoleSchema,
});
export type User = z.infer<typeof UserSchema>;

// Get a list of users
export const GetUserListResponseSchema = UserSchema.array();
export type GetUserListResponse = z.infer<typeof GetUserListResponseSchema>;

// Get a user
export const GetUserParamsSchema = UserSchema.pick({ id: true });
export const GetUserResponseSchema = z.object({
  ...UserSchema.omit({ role: true }).shape,
  roleId: RolesSchema,
});

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

// Invite Users
export const InviteUsersRequestSchema = z.object({
  email_addresses: z.array(z.email({ pattern: z.regexes.html5Email })),
  role: RolesSchema,
});
export type InviteUsersRequest = z.infer<typeof InviteUsersRequestSchema>;
export const InviteUsersResponseSchema = z.object({
  message: z.string(),
  userCount: z.number(),
});

// ReInvite User
export const ResendInviteUserParamsSchema = z.object({ id: z.string() });
export const ResendInviteUserResponseSchema = zMessageSchema;
