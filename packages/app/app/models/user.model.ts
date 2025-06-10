import { z } from "zod/v4";

import { createValidator } from "../utils/isomorphic";

// Roles
export const userRolesSchema = z.literal(["admin", "parent", "staff"]);
export type UserRole = z.infer<typeof userRolesSchema>;

// ------ API ------ //
// ## Invite users
export const inviteUsersApiRequestSchema = z.object({
  email_addresses: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim()))
    .pipe(z.array(z.email({ pattern: z.regexes.html5Email }))),
  role: userRolesSchema,
});
export const validateInviteUsers = createValidator(inviteUsersApiRequestSchema);
export type InviteUsersApiRequest = z.infer<typeof inviteUsersApiRequestSchema>;

// ## Update user role
