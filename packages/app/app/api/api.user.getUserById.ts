import type { Route } from "./+types/api.user.getUserById";

import { getNCCLClient } from "../utils/server";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(loaderArgs);
  try {
    const user = await ncclClient.user.getUser(loaderArgs.params.id);
    return user;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
