import { format } from "date-fns";
import { Hono } from "hono";
import { InviteUserEmail } from "@nccl/emails";

import {
  AcceptInviteRequestSchema,
  AcceptInviteResponseSchema,
  InviteUsersRequestSchema,
  InviteUsersResponseSchema,
  ValidateTokenParamsSchema,
  ValidateTokenResponseSchema,
} from "./account.schema.js";
import { createToken, findValidToken, markTokenUsed } from "./account.utils.js";

import { ErrorSet } from "../../client.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import { validate } from "../../middleware/middleware.validate.js";
import { getEnvVar } from "../../utils/util.envVar.js";
import { serialize } from "../../utils/util.serialize.js";
import { auth } from "../../auth.js";
import { sessionMiddleware } from "../../middleware/middleware.session.js";

export const account = new Hono();

account.post("/sign-out", sessionMiddleware, async (c) => {
  try {
    const res = await auth.api.signOut({ headers: c.req.raw.headers });
    return c.json(res);
  } catch {
    throw new ErrorSet.serverError(
      "There was an error when trying to sign out"
    );
  }
});

account.get("/session", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  return c.json(session);
});

// POST /api/user/invite | Invite 1 or many users
account.post(
  "/invite",
  sessionMiddleware,
  authorize("ADMIN"),
  validate("json", InviteUsersRequestSchema),
  async (c) => {
    const body = c.req.valid("json");
    const db = c.get("db");
    const currentUser = c.get("user");
    const env = getEnvVar(c);
    const resend = c.get("resend");

    const inviteTokens = await db.accountToken.findMany({
      where: { type: "INVITE" },
    });
    const alreadyInvitedEmails = inviteTokens.filter((inviteToken) => {
      return body.email_addresses.includes(inviteToken.email);
    });
    if (alreadyInvitedEmails.length !== 0) {
      throw new ErrorSet.validation({
        email_addresses: alreadyInvitedEmails.map(
          (e) => `"${e.email}" has already been invited`
        ),
      });
    }

    const createInviteAndEmailUsers = body.email_addresses.map((email) => {
      return db.$transaction(async (tx) => {
        const { inviteTokenRaw, inviteExpiresAt } = await createToken(
          tx.accountToken,
          {
            type: "INVITE",
            email,
            roleId: body.role,
            expiresInDays: 7,
            createdByUserId: currentUser.id,
          }
        );

        // email user
        const acceptInviteUrl = `${env.NCCL_APP_URL}/accept-invite?token=${inviteTokenRaw}`;
        const formattedExpiresAt = format(inviteExpiresAt, "PPPP");
        const emailRes = await resend.emails.send({
          from: "NCCL Parents <no-reply@ncclschool.org>",
          to: email,
          subject: "Invitation to join NCCL Parents",
          react: (
            <InviteUserEmail
              inviteLink={acceptInviteUrl}
              expiresInDays={7}
              expiresOnDate={formattedExpiresAt}
            />
          ),
        });
        if (emailRes.error) {
          console.log(emailRes.error);
          throw new ErrorSet.badRequest(emailRes.error.message);
        }
      });
    });

    await Promise.all(createInviteAndEmailUsers);

    const data = await serialize(InviteUsersResponseSchema, {
      message: `Successfully invited ${body.email_addresses.length} users.`,
      userCount: body.email_addresses.length,
    });

    return c.json(data);
  }
);

account.get(
  "/invite/validate/:token",
  validate("param", ValidateTokenParamsSchema),
  async (c) => {
    const { token } = c.req.valid("param");
    const db = c.get("db");
    const inviteToken = await findValidToken(db.accountToken, {
      type: "INVITE",
      rawToken: token,
    });
    if (!inviteToken) {
      const data = await serialize(ValidateTokenResponseSchema, {
        status: "invalid_token",
        reason:
          "The provided token is invalid, has expired or has already been used",
      });
      return c.json(data);
    }

    const data = await serialize(ValidateTokenResponseSchema, {
      status: "valid",
      email: inviteToken.email,
    });
    return c.json(data);
  }
);

// POST /api/account/invite/accept | Accept an invite by creating a username and password
account.post(
  "/invite/accept",
  validate("json", AcceptInviteRequestSchema),
  async (c) => {
    const db = c.get("db");
    const body = c.req.valid("json");
    const invite = await findValidToken(db.accountToken, {
      type: "INVITE",
      rawToken: body.token,
    });

    // No invite has been provided for the user
    if (!invite) {
      throw new ErrorSet.notFound("Invalid or expired token.");
    }

    // User already exists
    const user = await db.user.findUnique({ where: { email: invite.email } });
    if (user) {
      throw new ErrorSet.badRequest("User already exists.");
    }

    const newUser = await auth.api.signUpEmail({
      body: {
        email: invite.email,
        firstName: body.firstName,
        lastName: body.lastName,
        name: `${body.firstName} ${body.lastName}`,
        password: body.password,
        roleId: invite.roleId,
      },
    });

    await markTokenUsed(db.accountToken, {
      tokenId: invite.id,
      acceptedById: newUser.user.id,
    });
    const data = await serialize(AcceptInviteResponseSchema, {
      message: "Successfully accepted invite",
    });
    return c.json(data);
  }
);
