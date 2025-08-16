import type { LoaderFunctionArgs } from "react-router";
import type { Roles } from "@nccl/api/client";
import { redirect } from "react-router";
import { auth } from "@nccl/api/auth";

import { ServerError } from "./utils.server.response";

export async function getRole<T extends LoaderFunctionArgs>(loaderArgs: T) {
  const { user } = await ensureSession(loaderArgs);
  return user.roleId as Roles;
}

export async function isAdmin<T extends LoaderFunctionArgs>(loaderArgs: T) {
  const role = await getRole(loaderArgs);
  return role === "ADMIN";
}

export async function isTeacher<T extends LoaderFunctionArgs>(loaderArgs: T) {
  const role = await getRole(loaderArgs);
  return role === "STAFF";
}

export async function isUser<T extends LoaderFunctionArgs>(loaderArgs: T) {
  const role = await getRole(loaderArgs);
  return role === "USER";
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
  const role = await getRole(args);
  if (!role) {
    throw new ServerError.unauthorized();
  }
  if (typeof roleOrRoles === "string" && role !== roleOrRoles) {
    throw new ServerError.unauthorized();
  }
  if (Array.isArray(roleOrRoles) && !roleOrRoles.includes(role)) {
    throw new ServerError.unauthorized();
  }
}

/**
 * Ensure there is a logged-in user (via Better Auth cookie session).
 * Throws a redirect to /sign-in if not authenticated.
 */
export async function ensureSession<T extends { request: Request }>(args: T) {
  const session = await auth.api.getSession({ headers: args.request.headers });
  if (!session) {
    // preserve the originally requested URL
    const url = new URL(args.request.url);
    throw redirect(
      `/sign-in?redirect_url=${encodeURIComponent(url.toString())}`
    );
  }
  return { userId: session.user.id, ...session };
}
