import type { Route } from "./+types/api.user.updateUserRole";

import { getClerkClient, ServerResponse } from "../utils/server";
import { isAuthorized } from "../utils/server/utils.server.auth";
import type { UserRole } from "../models/user.model";

export async function action(args: Route.ActionArgs) {
  try {
    await isAuthorized(args, "admin");
    const formData = await args.request.formData();
    const clerkClient = await getClerkClient(args);
    await clerkClient.users.updateUser(args.params.id, {
      publicMetadata: {
        role: formData.get("role") as UserRole,
      },
    });
    return ServerResponse.success({
      status: "success",
      message: "Successfully changed the users role",
    });
  } catch (error) {
    return ServerResponse.error(error);
  }
}
