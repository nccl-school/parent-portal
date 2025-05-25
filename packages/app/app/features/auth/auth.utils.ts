import { getAuth } from "@clerk/react-router/ssr.server";
import type { LoaderFunctionArgs } from "react-router";

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
    return role === "teacher";
  }

  public async isParent() {
    const role = await this.getRole();
    return role === "parent";
  }
}
