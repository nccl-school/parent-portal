import type { Route } from "./+types/api.user.getUserById";

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const user = await ncclClient.user.getUser(args.params.id);
    return user;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
