import type { Route } from "./+types/api.user.resendInvite";

import { getNCCLClient } from "../utils/server";

/**
 * Server loader to resend an invite
 */
export async function loader(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const res = await ncclClient.user.resendInvitation(args.params.id);
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
