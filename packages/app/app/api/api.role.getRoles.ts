import type { Route } from "./+types/api.user.updateUserRole";

export async function loader(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const roles = await ncclClient.role.getRoleList();
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
