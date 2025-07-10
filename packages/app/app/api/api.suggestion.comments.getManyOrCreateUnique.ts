import type { Route } from "./+types/api.suggestion.comments.getManyOrCreateUnique";

import { getNCCLClient } from "../utils/server";

export async function loader(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const roles = await ncclClient.suggestion.getCommentsList(args.params.id);
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
