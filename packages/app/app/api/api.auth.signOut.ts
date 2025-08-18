import type { Route } from "./+types/api.auth.signOut";

import { getNCCLClient } from "../utils/server";

export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
    const res = await ncclClient.signOut();
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
