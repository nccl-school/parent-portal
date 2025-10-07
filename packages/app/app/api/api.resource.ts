import type { Route } from "./+types/api.resource";

export async function action(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    switch (args.request.method) {
      case "DELETE": {
        const json = await ncclClient.resource.delete(args.params.id);
        return json;
      }

      default:
        break;
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
