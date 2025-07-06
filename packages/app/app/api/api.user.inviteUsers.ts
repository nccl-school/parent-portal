import { InviteUsersRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.user.inviteUsers";

import { validateFormData } from "../utils/isomorphic";
import { getNCCLClient } from "../utils/server";

/**
 * Server action to invite a user
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    const formData = await args.request.formData();
    const body = await validateFormData(InviteUsersRequestSchema, formData);
    const res = await ncclClient.user.inviteUsers(body);
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
