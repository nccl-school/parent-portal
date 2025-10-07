import type { Roles } from "@nccl/api/client";

import type { Route } from "./+types/api.user.updateUserRole";

export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const formData = await args.request.formData();
    const role = await ncclClient.user.updateUserRole(args.params.id, {
      role: formData.get("role") as Roles,
    });
    return role;
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
