import { ErrorSet } from "@nccl/api/client";
import { redirect } from "react-router";

import type { Route } from "./+types/api.auth.signInSocial";

import { getNCCLClient } from "../utils/server";

export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    switch (args.params.provider) {
      case "google": {
        const res = await ncclClient.auth.signInGoogle();
        return redirect(res.url);
      }

      default:
        throw new ErrorSet.badRequest(
          `${args.params.provider} is not a supported social provider.`
        );
    }
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
