import type { Route } from "./+types/api.user";

export async function loader(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const roles = await ncclClient.user.getUserList();
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
