import type { Route } from "./+types/api.resource";

import { getNCCLClient } from "../utils/server";

export async function action(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    switch (args.request.method) {
      case "DELETE": {
        const json = await ncclClient.resource.delete(args.params.id);
        return json;
      }

      default:
        break;
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
