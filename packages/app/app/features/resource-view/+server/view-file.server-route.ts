import type { Route } from "./+types/view-file.server-route";

import { getNCCLClient } from "../../../utils/server";

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const resource = await ncclClient.resource.viewResource(args.params.id);
    return resource;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
