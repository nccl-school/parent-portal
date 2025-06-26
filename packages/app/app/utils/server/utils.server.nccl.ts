import { NCCLClient } from "@nccl/api/client";
import type { LoaderFunctionArgs, AppLoadContext } from "react-router";

export function getNcclClient<A extends LoaderFunctionArgs<AppLoadContext>>(
  args: A
) {
  return new NCCLClient({
    rootUrl: args.context.env.NCCL_API_URL,
    rootUrlSegments: ["api"],
  });
}
