import type { LoaderFunctionArgs, AppLoadContext } from "react-router";
import { ErrorSet, type Roles } from "@nccl/api/client";
import { redirect } from "react-router";
import { NCCLClient } from "@nccl/api/client";

// TODO: THIS WILL NOT WORK
export async function getRole<T extends LoaderFunctionArgs>(loaderArgs: T) {
  const session = await ensureSession(loaderArgs);
  return session.userId as Roles;
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
export async function ensureSession<T extends LoaderFunctionArgs>(args: T) {
  const ncclClient = getNCCLClient(args);
  const session = await ncclClient.account.getSession();
  if (!session) {
    // preserve the originally requested URL
    const url = new URL(args.request.url);
    throw redirect(
      `/sign-in?redirect_url=${encodeURIComponent(url.toString())}`
    );
  }
  return session;
}

export function getNCCLClient<A extends LoaderFunctionArgs<AppLoadContext>>(
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

  const client = new NCCLClient({
    rootUrl: args.context.env.NCCL_API_URL,
    rootUrlSegments: ["api"],
    headers,
  });

  return client;
}
