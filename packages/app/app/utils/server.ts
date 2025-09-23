import type { LoaderFunctionArgs, AppLoadContext } from "react-router";
import { ErrorSet, type Roles } from "@nccl/api/client";
import { href, redirect } from "react-router";
import { NCCLClient } from "@nccl/api/client";
import { ENV_RUNTIME } from "@nccl/env";

export async function getRole<T extends LoaderFunctionArgs>(loaderArgs: T) {
  const session = await ensureSession(loaderArgs);
  return session.user.roleId as Roles;
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

  const session = await ncclClient.auth.getSession();
  if (!session.session) {
    console.log("The user needs to sign in");
    const url = new URL(args.request.url);
    console.log("Requested URL", url.pathname);
    console.log("Redirecting to sign in");
    throw redirect(
      href(`/sign-in`).concat(
        `?redirect_url=${ENV_RUNTIME.getOne("NCCL_APP_URL")}/${url.pathname}`
      )
    );
  }

  console.log("User has session and is signed in");

  return session;
}

export function getNCCLClient<A extends LoaderFunctionArgs<AppLoadContext>>(
  args: A
) {
  const headers = new Headers();
  for (const hKey of ["cookie", "authorization"]) {
    const hValue = args.request.headers.get(hKey);
    if (hValue) headers.set(hKey, hValue);
  }

  const client = new NCCLClient({
    rootUrl: args.context.env.NCCL_API_URL,
    rootUrlSegments: ["api"],
    headers,
  });

  return client;
}
