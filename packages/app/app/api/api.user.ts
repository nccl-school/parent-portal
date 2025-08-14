import type { Route } from "./+types/api.user";

import { getNCCLClient } from "../utils/server";

export async function loader(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const roles = await ncclClient.user.getUserList();
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
