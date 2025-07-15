import { Hono } from "hono";

import {
  GetUserListResponseSchema,
  GetUserParamsSchema,
  GetUserResponseSchema,
  InviteUsersRequestSchema,
  InviteUsersResponseSchema,
  ResendInviteUserParamsSchema,
  ResendInviteUserResponseSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
} from "./user.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import { getEnvVar } from "../../utils/util.envVar.js";
import { serialize } from "../../utils/util.serialize.js";

export const user = new Hono();

// GET /api/user | Get a list of users
user.get("/", authorize("ADMIN"), async (c) => {
  const db = c.get("db");
  const users = await db.user.findMany({
    include: {
      role: {},
    },
  });
  const data = await serialize(GetUserListResponseSchema, users);
  return c.json(data);
});

// GET /api/user/:id | Get a user
user.get("/:id", validate("param", GetUserParamsSchema), async (c) => {
  const params = c.req.valid("param");
  const db = c.get("db");
  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user) {
    throw new ErrorSet.notFound("");
  }

  const data = await serialize(GetUserResponseSchema, user);
  return c.json(data);
});

// PUT /api/user/:id/role | Update a users role
user.put(
  "/:id/role",
  authorize("ADMIN"),
  validate("param", UpdateUserRoleParamsSchema),
  validate("json", UpdateUserRoleRequestSchema),
  async (c) => {
    const body = c.req.valid("json");
    const param = c.req.valid("param");
    const db = c.get("db");
    console.log("Updating user in db");
    const dbUser = await db.user.update({
      data: {
        roleId: body.role,
      },
      where: {
        id: param.id,
      },
      include: {
        role: {},
      },
    });

    if (!dbUser.authId) {
      throw new ErrorSet.serverError(
        "The db user is out of sync with the authentication system. Cannot update the authentication cached mirror."
      );
    }

    console.log("Updating clerk cached mirror");
    const clerk = c.get("clerk");
    await clerk.users.updateUser(dbUser.authId, {
      publicMetadata: {
        role: body.role,
        db_id: dbUser.id,
      },
    });

    // Invalidate the current user cache
    const data = await serialize(UpdateUserRoleResponseSchema, dbUser);
    return c.json(data);
  }
);

// POST /api/user/invite | Invite 1 or many users
// - Fetches the invitation list
// - Checks to see if any of the emails have been invited
// - Throws a validation error if they have already been invited
// - Invites the user in clerk
// - Creates the user in the DB with an invited status
user.post(
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

    const db = c.get("db");
    const users = await db.user.createManyAndReturn({
      data: body.email_addresses.map((email) => ({
        email,
        roleId: body.role,
        status: "INVITED",
      })),
    });

    await Promise.all(
      users.map(async (dbUser) => {
        const invite = await clerk.invitations.createInvitation({
          emailAddress: dbUser.email,
          redirectUrl: env.NCCL_APP_URL.concat("/sign-up"),
          publicMetadata: {
            role: body.role,
            db_id: dbUser.id,
          },
        });
        await db.user.update({
          where: { id: dbUser.id },
          data: { invitationId: invite.id, invitedAt: new Date() },
        });
      })
    );

    const data = await serialize(InviteUsersResponseSchema, {
      message: `Successfully invited ${body.email_addresses.length} users.`,
      userCount: body.email_addresses.length,
    });

    return c.json(data);
  }
);

// GET /api/user/resend-invite/:id | Reinvite a user to the app
// - Get's the user
// - Revokes the current invitation
// - Re-invites the user
// - Updates the user with the new invitationId
user.get(
  "/resend-invite/:id",
  authorize("ADMIN"),
  validate("param", ResendInviteUserParamsSchema),
  async (c) => {
    const params = c.req.valid("param");
    const clerk = c.get("clerk");
    const db = c.get("db");
    const env = getEnvVar(c);

    console.log("Resending invite to", params.id);

    const dbUser = await db.user.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!dbUser) {
      throw new ErrorSet.notFound("Unable to locate user to resend invite");
    }
    if (!dbUser.invitationId) {
      throw new ErrorSet.notFound(
        "Unable to locate users invitation record to resend"
      );
    }

    await clerk.invitations.revokeInvitation(dbUser.invitationId);

    const invite = await clerk.invitations.createInvitation({
      emailAddress: dbUser.email,
      redirectUrl: env.NCCL_APP_URL.concat("/sign-up"),
      publicMetadata: {
        db_id: dbUser.id,
        role: dbUser.roleId,
      },
    });

    await db.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        invitationId: invite.id,
        invitedAt: new Date(),
      },
    });

    const data = await serialize(ResendInviteUserResponseSchema, {
      message: `Successfully re-invited ${dbUser.email}`,
    });

    return c.json(data);
  }
);

user.all(() => {
  throw new ErrorSet.notFound();
});
