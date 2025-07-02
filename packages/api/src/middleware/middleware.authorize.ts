import { createMiddleware } from "hono/factory";

import type { Roles } from "../features/role/role.utils.js";
import { ErrorSet } from "../utils/util.errors.js";

export const authorize = (roleOrRoles: Roles | Roles[]) =>
  createMiddleware(async (c, next) => {
    const currentUser = c.get("currentUser");
    console.log(
      "Checking users role against required role",
      currentUser.roleId,
      roleOrRoles
    );
    if (typeof roleOrRoles === "string" && currentUser.roleId !== roleOrRoles) {
      throw new ErrorSet.unauthorized();
    }
    if (!roleOrRoles.includes(currentUser.roleId)) {
      throw new ErrorSet.unauthorized();
    }
    await next();
  });
