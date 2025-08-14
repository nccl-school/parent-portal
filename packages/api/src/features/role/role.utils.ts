import { z } from "zod";

// id source of truth
// seed data is built off of this union
export const RolesSchema = z.literal(["ADMIN", "STAFF", "USER"], {
  error: "A role is required",
});
export type Roles = z.infer<typeof RolesSchema>;

export const RoleSchema = z.object({
  id: RolesSchema,
  label: z.string(),
  description: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;

// ## Get a list of roles
export const GetRoleListResponseSchema = RoleSchema.array();
export type GetRoleListResponse = z.infer<typeof GetRoleListResponseSchema>;
