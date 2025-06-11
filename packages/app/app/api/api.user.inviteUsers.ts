import z from "zod/v4";

import type { Route } from "./+types/api.user.inviteUsers";

import { getClerkClient, ServerResponse, ServerError } from "../utils/server";
import { isAuthorized } from "../utils/server/utils.server.auth";
import { userRolesSchema } from "../models/user.model";
import { createValidator } from "../utils/isomorphic";

export const inviteUsersApiRequestSchema = z.object({
  email_addresses: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim()))
    .pipe(z.array(z.email({ pattern: z.regexes.html5Email }))),
  role: userRolesSchema,
});
export const validateInviteUsers = createValidator(inviteUsersApiRequestSchema);
export type InviteUsersApiRequest = z.infer<typeof inviteUsersApiRequestSchema>;

/**
 * Server action to invite a user
 */
export async function action(args: Route.ActionArgs) {
  try {
    // Ensure the user is an admin
    await isAuthorized(args, "admin");

    // Parse the form data from the request
    const formData = await args.request.formData();
    const data = await validateInviteUsers(formData);

    const clerkClient = await getClerkClient(args);

    // Check if any of the users have been invited
    const invitations = await clerkClient.invitations.getInvitationList({
      limit: 200,
    });
    const alreadyInvitedEmails = invitations.data.filter((invitation) => {
      return data.email_addresses.includes(invitation.emailAddress);
    });
    if (alreadyInvitedEmails.length !== 0) {
      throw new ServerError.invalid<keyof InviteUsersApiRequest>({
        email_addresses: alreadyInvitedEmails.map(
          (e) => `"${e.emailAddress}" has already been invited`
        ),
      });
    }

    // Send the invitations
    const responses = await Promise.allSettled(
      data.email_addresses.map((emailAddress) =>
        clerkClient.invitations.createInvitation({
          emailAddress,
          ignoreExisting: true,
          redirectUrl: args.context.env.NCCL_APP_URL.concat("/sign-up"),
          publicMetadata: {
            role: data.role,
          },
        })
      )
    );

    console.log(responses);

    return ServerResponse.success({
      status: "success",
      message: "Successfully changed the users role",
    });
  } catch (error) {
    console.log(error);
    return ServerResponse.error<keyof InviteUsersApiRequest>(error);
  }
}
