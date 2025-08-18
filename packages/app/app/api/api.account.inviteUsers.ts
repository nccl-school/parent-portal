import { InviteUsersRequestSchema } from "@nccl/api/client";
import z from "zod";

import type { Route } from "./+types/api.account.inviteUsers";

import { validateFormData } from "../utils/isomorphic";
import { getNCCLClient } from "../utils/server";

/**
 * Server action to invite a user
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    const formData = await args.request.formData();
    const body = await validateFormData(
      // extend the request schema to get the emails from formData
      InviteUsersRequestSchema.extend({
        email_addresses: z.string("Please add 1 or many email addresses"),
      }),
      formData
    );
    // create an array from the email addresses and re-validate the
    // array against the raw request
    const emailArray = body.email_addresses.split(",");
    const requestBody = InviteUsersRequestSchema.parse({
      ...body,
      email_addresses: emailArray,
    });
    const res = await ncclClient.account.inviteUsers(requestBody);
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
