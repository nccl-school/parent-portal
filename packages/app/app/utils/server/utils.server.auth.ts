import type { AppLoadContext, LoaderFunctionArgs } from "react-router";
import { ErrorSet, type Roles } from "@nccl/api/client";
import { redirect } from "react-router";
import { auth } from "@nccl/api/auth";

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
    throw new ErrorSet.unauthorized();
  }
  if (typeof roleOrRoles === "string" && role !== roleOrRoles) {
    throw new ErrorSet.unauthorized();
  }
  if (Array.isArray(roleOrRoles) && !roleOrRoles.includes(role)) {
    throw new ErrorSet.unauthorized();
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

export class AuthClient {
  headers: Headers;
  constructor({ headers }: { headers: Headers }) {
    this.headers = headers;
  }

  signOut() {
    return auth.api.signOut({ headers: this.headers });
  }

  getSession() {
    return auth.api.getSession({ headers: this.headers });
  }
}

export function getAuthClient<A extends LoaderFunctionArgs<AppLoadContext>>(
  args: A
) {
  // Grab some of the headers off of the original request
  const { cookie, authorization } = Object.fromEntries(
    args.request.headers.entries()
  );

  // Set the selected headers to the new client
  const headers = new Headers();
  if (cookie) headers.set("cookie", cookie);
  if (authorization) headers.set("authorization", authorization);

  return new AuthClient({ headers: args.request.headers });
}
