import type { Route } from "./+types/api.user.inviteUsers";

import { getClerkClient, ServerResponse, ServerError } from "../utils/server";
import { isAuthorized } from "../utils/server/utils.server.auth";
import {
  validateInviteUsers,
  type InviteUsersApiRequest,
} from "../models/user.model";

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
          (e) => `"${e}" has already been invited`
        ),
      });
    }
    // Send the invitations
    // await clerkClient.users.updateUser(args.params.id, {
    //   publicMetadata: {
    //     role: data.role,
    //   },
    // });
    return ServerResponse.success({
      status: "success",
      message: "Successfully changed the users role",
    });
  } catch (error) {
    return ServerResponse.error<keyof InviteUsersApiRequest>(error);
  }
}
