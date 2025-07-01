import { z } from "zod/v4";

import { zDateStringSchema } from "../../utils/util.schema.js";
import { RolesSchema } from "../role/role.utils.js";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});
export type User = z.infer<typeof UserSchema>;

// Create a user
export const CreateUserRequestSchema = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
}).extend({ role: RolesSchema });
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

// Invite Users
export const InviteUsersRequestSchema = z.object({
  email_addresses: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim()))
    .pipe(z.array(z.email({ pattern: z.regexes.html5Email }))),
  role: RolesSchema,
});
export type InviteUsersRequest = z.infer<typeof InviteUsersRequestSchema>;
