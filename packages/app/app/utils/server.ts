import type { LoaderFunctionArgs, AppLoadContext } from "react-router";
import { ErrorSet, type Roles } from "@nccl/api/client";
import { href, redirect } from "react-router";
import { NCCLClient } from "@nccl/api/client";
import type { auth } from "@nccl/api/auth.server";
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

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
  const authClient = getAuthClient(args);

  console.log("cookie header", args.request.headers.get("cookie"));

  const res = await authClient.getSession();

  console.log("ensuringSession", res);

  // no session and no error, user needs to sign in
  if (!res.data?.session && !res.error) {
    console.log("No session and no error. The user needs to sign in");
    const url = new URL(args.request.url);
    throw redirect(href(`/sign-in`).concat(`?redirect_url=${url.toString()}`));
  }

  console.log(res.data);
}

function getHeadersFromRequest(request: Request) {
  const headers = new Headers();
  for (const hKey of ["cookie", "authorization"]) {
    const hValue = request.headers.get(hKey);
    if (hValue) headers.set(hKey, hValue);
  }
  return headers;
}

export function getAuthClient<A extends LoaderFunctionArgs<AppLoadContext>>(
  args: A
) {
  const headers = getHeadersFromRequest(args.request);

  console.log(headers);

  return createAuthClient({
    baseURL: args.context.env.NCCL_API_URL.concat("/api/auth"),
    plugins: [inferAdditionalFields<typeof auth>()],
    fetchOptions: {
      credentials: "include",
      headers: headers,
    },
  });
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

/**
 * Proxies a Better Auth upstream response back to the browser.
 *
 * - Forwards all Set-Cookie headers (even when coalesced by undici/Node).
 * - Preserves redirect status + Location header.
 * - Copies Content-Type and body for non-redirects.
 */
export async function proxyAuthResponse(upstream: Response): Promise<Response> {
  const headers = new Headers();

  // --- Handle cookies (works in Node 18/20/undici) ---
  const anyHeaders = upstream.headers as Headers & {
    getSetCookie?: () => string[];
  };

  const cookies: string[] =
    typeof anyHeaders.getSetCookie === "function"
      ? anyHeaders.getSetCookie()
      : (() => {
          const v = upstream.headers.get("set-cookie");
          // If multiple cookies were coalesced, split on commas that start a new cookie
          return v ? v.split(/,(?=\s*[^\s=]+?=)/g) : [];
        })();

  for (const c of cookies) {
    headers.append("set-cookie", c);
  }

  // --- Preserve redirect Location if present ---
  const location = upstream.headers.get("location");
  if (location) {
    headers.set("Location", location);
  }

  // --- Preserve content-type if body is forwarded ---
  const contentType = upstream.headers.get("content-type");
  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  // --- Decide body ---
  const status = upstream.status;
  const body =
    status >= 300 && status < 400
      ? null // don't forward body for redirects
      : await upstream.text();

  return new Response(body, { status, headers });
}
