import type { Route } from "./+types/api.suggestion.comment";

import { getNCCLClient } from "../utils/server";

/**
 * Add a new comment to a suggestion
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    switch (args.request.method) {
      case "DELETE": {
        const res = await ncclClient.suggestion.deleteComment(args.params.id);
        return res;
      }

      default:
        break;
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
