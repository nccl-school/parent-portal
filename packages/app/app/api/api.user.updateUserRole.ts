import type { Roles } from "@nccl/api/client";

import type { Route } from "./+types/api.user.updateUserRole";

import { getNCCLClient, ServerResponse } from "../utils/server";

export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const formData = await args.request.formData();
    await ncclClient.user.updateUserRole(args.params.id, {
      role: formData.get("role") as Roles,
    });
    return ServerResponse.success({
      status: "success",
      message: "Successfully changed the users role",
    });
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
