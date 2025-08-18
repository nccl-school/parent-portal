import type { LoaderFunctionArgs, AppLoadContext } from "react-router";
import { ErrorSet, type Roles } from "@nccl/api/client";
import { redirect } from "react-router";
import { NCCLClient } from "@nccl/api/client";
import { auth } from "@nccl/api/auth.server";

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
  const authClient = getAuthClient();
  const session = await authClient.getSession({
    headers: args.request.headers,
  });
  if (!session) {
    // preserve the originally requested URL
    const url = new URL(args.request.url);
    throw redirect(
      `/sign-in?callback_url=${encodeURIComponent(url.toString())}`
    );
  }
  return session;
}

function getHeadersFromRequest(request: Request) {
  const headers = new Headers();
  for (const hKey of ["cookie", "authorization"]) {
    const hValue = request.headers.get(hKey);
    if (hValue) headers.set(hKey, hValue);
  }
  return headers;
}

export function getAuthClient() {
  return auth.api;
}

export function getNCCLClient<A extends LoaderFunctionArgs<AppLoadContext>>(
  args: A
) {
  const headers = getHeadersFromRequest(args.request);

  const client = new NCCLClient({
    rootUrl: args.context.env.NCCL_API_URL,
    rootUrlSegments: ["api"],
    headers,
  });

  return client;
}

export function withSetCookie(from: Response, to: Response) {
  // Node 20+ (undici) sometimes exposes getSetCookie()
  const anyHeaders = from.headers as Headers;
  const cookies: string[] =
    typeof anyHeaders.getSetCookie === "function"
      ? anyHeaders.getSetCookie()
      : (() => {
          const v = from.headers.get("set-cookie");
          // If multiple cookies were coalesced, split on comma that starts a new cookie (", " followed by token=)
          return v ? v.split(/,(?=\s*[^\s=]+?=)/g) : [];
        })();

  for (const c of cookies) {
    to.headers.append("set-cookie", c);
  }
  return to;
}
