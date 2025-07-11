import { Hono } from "hono";

import { TaskSchema } from "./task.utils.js";

import { authorize } from "../../middleware/middleware.authorize.js";
import { validate } from "../../middleware/middleware.validate.js";
import { RolesSchema } from "../role/role.utils.js";
import { findClerkUserPrimaryEmail } from "../../utils/util.clerk.js";

export const task = new Hono();

task.post("/", authorize("ADMIN"), validate("json", TaskSchema), async (c) => {
  const body = c.req.valid("json");
  const db = c.get("db");
  const clerk = c.get("clerk");

  switch (body.type) {
    case "sync_db_with_clerk": {
      // Get all of the current users from clerk
      console.log("Fetching clerk users");
      const clerkUsers = await clerk.users.getUserList({ limit: 100 });

      // Loop through all of the clerkUsers and update or create the users
      // in the DB based upon the user's primary email. At this point, the only
      // unique ID that we have to go off is the email since we're trying to sync
      // db_id and auth_id between the two systems
      for (const clerkUser of clerkUsers.data) {
        const clerkUserPrimaryEmail = findClerkUserPrimaryEmail(clerkUser);
        const { id, firstName, lastName } = clerkUser;
        // Create or update the user
        console.log(
          "Ensuring clerkUser into the db",
          id,
          firstName,
          lastName,
          clerkUserPrimaryEmail
        );
        const clerkRole = RolesSchema.safeParse(clerkUser.publicMetadata.role);
        const roleId = clerkRole.success ? clerkRole.data : "USER";
        const dbUser = await db.user.upsert({
          where: {
            email: clerkUserPrimaryEmail,
          },
          create: {
            email: clerkUserPrimaryEmail,
            authId: clerkUser.id,
            roleId: roleId,
            status: "ACTIVE",
          },
          update: {
            authId: clerkUser.id,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl,
            email: clerkUserPrimaryEmail,
            status: "ACTIVE",
          },
        });

        // If the clerk user doesn't have the correct public meta we update them
        console.log("Syncing clerk user public metadata with db user");
        await clerk.users.updateUser(clerkUser.id, {
          publicMetadata: { db_id: dbUser.id, role: dbUser.roleId },
        });
      }

      // Get all of the users that exist in the DB and ensure that clerk
      // has the correct public metadata. This will in turn fire a webhook
      // that will sync the rest of the clerk data such as name and imageUrl
      // with the current db users

      //   const invitedUsers = await clerk.invitations.getInvitationList({
      //     limit: 1_000,
      //   });
      //   console.log(invitedUsers);

      //   // find the users in the Db with the email addresses
      //   for (const invitedUser of invitedUsers) {
      //     await db.user.upsert;
      //   }
      break;
    }

    default:
      break;
  }

  return c.body(null, 204);
});
