import { z } from "zod/v4";

import { UserSchema } from "../user/user.utils.js";
import { RoleSchema } from "../role/role.utils.js";

export const DirectorySchema = z.object({
  ...UserSchema.pick({
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    imageUrl: true,
    phone: true,
  }).shape,
  role: RoleSchema,
});
export const GetDirectoryResponseSchema = DirectorySchema.array();
export type GetDirectoryResponse = z.infer<typeof GetDirectoryResponseSchema>;
