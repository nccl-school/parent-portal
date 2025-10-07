import type { LoaderFunctionArgs, RouterContextProvider } from "react-router";
import { ErrorSet, type Roles } from "@nccl/api/client";
import { href, redirect } from "react-router";
import { NCCLClient } from "@nccl/api/client";

import { LOG } from "./isomorphic";

import { getUserName } from "../features/user";

export type LoaderFnArgs = LoaderFunctionArgs<Readonly<RouterContextProvider>>;

export async function getRole<T extends LoaderFnArgs>(args: T) {
  const session = await ensureSession(args);
  return session.user.roleId as Roles;
}

export async function isAdmin<T extends LoaderFnArgs>(loaderArgs: T) {
  const role = await getRole(loaderArgs);
  return role === "ADMIN";
}

export async function isTeacher<T extends LoaderFnArgs>(loaderArgs: T) {
  const role = await getRole(loaderArgs);
  return role === "STAFF";
}

export async function isUser<T extends LoaderFnArgs>(loaderArgs: T) {
  const role = await getRole(loaderArgs);
  return role === "USER";
}

/**
 * Simple function to determine if a user is authorized to access
 * a loader or an action. If the user isn't authorize then it will
 * throw a ErrorForbidden error
 */
export async function isAuthorized(
  args: LoaderFnArgs,
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
export async function ensureSession<T extends LoaderFnArgs>({
  context,
  request,
}: T) {
  LOG.debug("Ensuring user has an active session...");

  const env = context.resolve("env");
  const ncclClient = context.resolve("ncclClient");

  const session = await ncclClient.auth.getSession();
  const url = new URL(request.url);

  if (!session?.session) {
    LOG.info("The user does NOT have a valid session");
    LOG.debug("Requested URL", { pathname: url.pathname });
    LOG.debug("Redirecting to sign in page");
    throw redirect(
      href(`/sign-in`).concat(
        `?redirect_url=${env.NCCL_APP_URL}/${url.pathname}`
      )
    );
  }

  // Add the user to every request from here on out
  LOG.addContextProvider(() => ({
    userId: session.user.id,
    userFullName: getUserName(session.user),
  }));
  LOG.info("Session found. Serving requested page", {
    url: url.pathname,
  });

  return session;
}

/**
 * @deprecated Please use the `context.resolve("ncclClient")` method on the context
 */
export function getNCCLClient<A extends LoaderFnArgs>(args: A) {
  const client = args.context.resolve("ncclClient");
  return client;
}

/**
 * @deprecated Please use the `context.resolve("env")` method on the context
 */
export function getEnvVar<A extends LoaderFnArgs>(args: A) {
  const env = args.context.resolve("env");
  return env;
}

export function createNCCLClient(
  reqHeaders: Headers,
  env: { NCCL_API_URL: string }
) {
  const headers = new Headers();
  for (const hKey of ["cookie", "authorization"]) {
    const hValue = reqHeaders.get(hKey);
    if (hValue) headers.set(hKey, hValue);
  }

  const client = new NCCLClient({
    rootUrl: env.NCCL_API_URL,
    rootUrlSegments: ["api"],
    headers,
  });

  return client;
}
