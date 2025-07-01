import { z } from "zod";

// id source of truth
// seed data is built off of this union
export const RolesSchema = z.union([
  z.literal("ADMIN"),
  z.literal("STAFF"),
  z.literal("USER"),
]);
export type Roles = z.infer<typeof RolesSchema>;

export const RoleSchema = z.object({
  id: RolesSchema,
  label: z.string(),
  description: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
