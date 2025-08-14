import type { Route } from "./+types/api.resource.tree";

import { getNCCLClient } from "../utils/server";

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const roles = await ncclClient.resource.getTreeByPath(args.params["*"]);
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
