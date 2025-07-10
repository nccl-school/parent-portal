import type { Route } from "./+types/api.suggestion.getOrUpdateUnique";

import { getNCCLClient } from "../utils/server";

/**
 * Get a single suggestion by ID
 */
export async function loader(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const roles = await ncclClient.suggestion.getSuggestion(args.params.id);
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
