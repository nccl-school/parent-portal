import path from "node:path";

import { ENV_RUNTIME } from "@nccl/env";

const relativeToRoot = (pathname: string) =>
  path.join(path.resolve(import.meta.dirname, "../../"), pathname);

export const ROLE_CONFIG = {
  super: {
    statePath: relativeToRoot("playwright/api/.auth/super.json"),
    email: ENV_RUNTIME.getOne("SUPER_USER_EMAIL"),
    password: ENV_RUNTIME.getOne("SUPER_USER_PASSWORD"),
  },
  // admin: "playwright/api/.auth/admin.json",
  // staff: "playwright/api/.auth/staff.json",
  // user: "playwright/api/.auth/user.json",
} as const;

export type Role = keyof typeof ROLE_CONFIG;
export const roles: Role[] = Object.keys(ROLE_CONFIG) as Role[];
