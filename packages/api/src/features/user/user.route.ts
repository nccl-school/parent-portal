import { Hono } from "hono";

import {
  GetUserListResponseSchema,
  GetUserParamsSchema,
  GetUserResponseSchema,
  InviteUsersRequestSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
  type InviteUsersResponse,
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
    include: {
      role: {},
    },
  });
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
    const user = await db.user.update({
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

    // Invalidate the current user cache
    const data = await serialize(UpdateUserRoleResponseSchema, user);
    console.log(user, data);
    return c.json(data);
  }
);

// POST /api/user/invite | Invite 1 or many users
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
);

user.all(() => {
  throw new ErrorSet.notFound();
});
