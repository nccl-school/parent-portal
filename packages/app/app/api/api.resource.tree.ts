import type { Route } from "./+types/api.resource.tree";

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const roles = await ncclClient.resource.getTreeByPath(args.params["*"]);
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
