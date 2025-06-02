import { getAuth } from "@clerk/react-router/ssr.server";
import type { LoaderFunctionArgs } from "react-router";

import type { Roles } from "../../global";
import { ErrorForbidden } from "../../utils/server";

export class RBAC {
  #loaderArgs: LoaderFunctionArgs;

  constructor(loaderArgs: LoaderFunctionArgs) {
    this.#loaderArgs = loaderArgs;
  }

  public async getRole() {
    const { sessionClaims } = await getAuth(this.#loaderArgs);
    return sessionClaims?.metadata.role;
  }

  public async isAdmin() {
    const role = await this.getRole();
    return role === "admin";
  }

  public async isTeacher() {
    const role = await this.getRole();
    return role === "staff";
  }

  public async isParent() {
    const role = await this.getRole();
    return role === "parent";
  }
}

/**
 * Simple function to determine if a user is authorized to access
 * a loader or an action. If the user isn't authorize then it will
 * throw a ErrorForbidden error
 */
export async function isAuthorized(
  args: LoaderFunctionArgs,
  roleOrRoles: Roles | Roles[]
) {
  const rbac = new RBAC(args);
  const role = await rbac.getRole();
  if (!role) {
    throw new ErrorForbidden();
  }
  if (typeof roleOrRoles === "string" && role !== roleOrRoles) {
    throw new ErrorForbidden();
  }
  if (Array.isArray(roleOrRoles) && !roleOrRoles.includes(role)) {
    throw new ErrorForbidden();
  }
}
