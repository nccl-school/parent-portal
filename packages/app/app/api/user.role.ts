import type { Route } from "./+types/user.role";

import { isAuthorized } from "../features/auth/auth.utils";
import { getClerkClient, handleError } from "../utils/server";
import type { Roles } from "../global";

export async function action(args: Route.ActionArgs) {
  try {
    await isAuthorized(args, "admin");
    const formData = await args.request.formData();
    const clerkClient = await getClerkClient(args);
    await clerkClient.users.updateUser(args.params.id, {
      publicMetadata: {
        role: formData.get("role") as Roles,
      },
    });
    return {
      status: "success",
      message: "Successfully changed the users role",
    };
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}
