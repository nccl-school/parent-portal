import { z } from "zod";
import { CropSchema } from "holycrop/server";

import { zDateStringSchema, zStringOptional } from "../../utils/util.schema.js";
import { RoleSchema, RolesSchema } from "../role/role.utils.js";

export const UserStatusSchema = z.literal(["INVITED", "ACTIVE", "DISABLED"]);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const UserIDParamsSchema = z.object({
  id: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  bio: z.string().nullable(),
  emailVerified: z.boolean(),
  phone: z.string().nullable(),
  imageUrl: z.string().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable(),
  isSuper: z.boolean().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});
export type User = z.infer<typeof UserSchema>;
export const UserWithRoleSchema = z.object({
  ...UserSchema.shape,
  role: RoleSchema,
});
export type UserWithRole = z.infer<typeof UserWithRoleSchema>;

// Get Current user
export const GetCurrentUserResponseSchema = z.object({
  ...UserSchema.shape,
  role: RoleSchema,
});
export type GetCurrentUserResponse = z.infer<
  typeof GetCurrentUserResponseSchema
>;

// Get a list of users
export const GetUserListResponseSchema = UserWithRoleSchema.array();
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
export const UpdateUserRoleRequestSchema = z.object({
  role: RolesSchema,
});
export const UpdateUserRoleResponseSchema = UserWithRoleSchema;
export type UpdateUserRoleResponse = z.infer<
  typeof UpdateUserRoleResponseSchema
>;

// Update a user's profile a user
export const UpdateMyProfileRequestSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  imageUrl: true,
  phone: true,
  bio: true,
}).extend({
  bio: zStringOptional(),
  imageUrl: zStringOptional(),
  phone: zStringOptional(),
});
export type UpdateMyProfileRequest = z.infer<
  typeof UpdateMyProfileRequestSchema
>;
export const UpdateMyProfileResponseSchema = UserSchema;
export type UpdateMyProfileResponse = z.infer<
  typeof UpdateMyProfileResponseSchema
>;

// Update a user's avatar
export const UpdateAvatarRequestSchema = CropSchema;
export type UpdateAvatarRequest = z.infer<typeof UpdateAvatarRequestSchema>;
export const UpdateAvatarResponseSchema = UserSchema;
export type UpdateAvatarResponse = z.infer<typeof UpdateAvatarResponseSchema>;
