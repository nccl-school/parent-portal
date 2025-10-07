import type { Route } from "./+types/api.suggestion.getOrUpdateUnique";

/**
 * Get a single suggestion by ID
 */
export async function loader(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const roles = await ncclClient.suggestion.getSuggestion(args.params.id);
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
