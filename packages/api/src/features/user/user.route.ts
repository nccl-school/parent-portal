import { Hono } from "hono";

import {
  InviteUsersRequestSchema,
  type InviteUsersResponse,
} from "./user.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import { getEnvVar } from "../../utils/util.envVar.js";

export const user = new Hono();

user
  // POST /api/user/invite
  .post(
    "/invite",
    authorize("ADMIN"),
    validate("json", InviteUsersRequestSchema),
    async (c) => {
      const body = c.req.valid("json");
      const clerk = c.get("clerk");
      const env = getEnvVar(c);

      const invitations = await clerk.invitations.getInvitationList({
        limit: 200,
      });
      const alreadyInvitedEmails = invitations.data.filter((invitation) => {
        return body.email_addresses.includes(invitation.emailAddress);
      });
      if (alreadyInvitedEmails.length !== 0) {
        throw new ErrorSet.validation({
          email_addresses: alreadyInvitedEmails.map(
            (e) => `"${e.emailAddress}" has already been invited`
          ),
        });
      }

      await Promise.all(
        body.email_addresses.map((emailAddress) => {
          clerk.invitations.createInvitation({
            emailAddress,
            ignoreExisting: true,
            redirectUrl: env.NCCL_APP_URL.concat("/sign-up"),
            publicMetadata: {
              role: body.role,
            },
          });
        })
      );

      const res: InviteUsersResponse = {
        message: `Successfully invited ${body.email_addresses.length} users.`,
        userCount: body.email_addresses.length,
      };

      return c.json(res);
    }
  )
  .all(() => {
    throw new ErrorSet.notFound();
  });
