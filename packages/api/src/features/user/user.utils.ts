import { z } from "zod/v4";

export const userRolesSchema = z.literal(["admin", "parent", "staff"]);
export type UserRole = z.infer<typeof userRolesSchema>;
