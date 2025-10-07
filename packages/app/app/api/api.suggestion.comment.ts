import type { Route } from "./+types/api.suggestion.comment";

/**
 * Add a new comment to a suggestion
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    switch (args.request.method) {
      case "DELETE": {
        const res = await ncclClient.suggestion.deleteComment(args.params.id);
        return res;
      }

      default:
        break;
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
