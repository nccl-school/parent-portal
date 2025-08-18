import { getNCCLClient } from "../utils/server";

export async function action(args: ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
    const res = await ncclClient.signOut();
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
