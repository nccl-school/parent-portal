import { NCCLClient } from "@nccl/api/client";
import type { LoaderFunctionArgs, AppLoadContext } from "react-router";

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
