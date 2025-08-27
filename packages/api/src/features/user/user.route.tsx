import { Hono } from "hono";

import {
  GetCurrentUserResponseSchema,
  GetUserListResponseSchema,
  GetUserParamsSchema,
  GetUserResponseSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
} from "./user.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { authorize } from "../../middleware/middleware.authorize.js";
import { serialize } from "../../utils/util.serialize.js";

export const user = new Hono();

user.get("/current", async (c) => {
  const db = c.get("db");
  const currentUser = c.get("user");
  const userWithRole = await db.user.findUnique({
    where: {
      id: currentUser.id,
    },
    include: {
      role: true,
    },
  });
  if (!userWithRole) throw new ErrorSet.notFound("Cannot get the current user");
  const data = await serialize(GetCurrentUserResponseSchema, userWithRole);
  return c.json(data);
});

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
    const user = await db.user.update({
      data: {
        roleId: body.role,
      },
      where: {
        id: param.id,
      },
      include: {
        role: true,
      },
    });

    // Invalidate the current user cache
    const data = await serialize(UpdateUserRoleResponseSchema, user);
    return c.json(data);
  }
);

// GET /api/user/resend-invite/:id | Reinvite a user to the app
// - Get's the user
// - Revokes the current invitation
// - Re-invites the user
// - Updates the user with the new invitationId
// user.get(
//   "/resend-invite/:id",
//   authorize("ADMIN"),
//   validate("param", ResendInviteUserParamsSchema),
//   async (c) => {
//     const params = c.req.valid("param");
//     const db = c.get("db");
//     const env = getEnvVar(c);

//     console.log("Resending invite to", params.id);

//     const dbUser = await db.user.findUnique({
//       where: {
//         id: params.id,
//       },
//     });
//     if (!dbUser) {
//       throw new ErrorSet.notFound("Unable to locate user to resend invite");
//     }
//     if (!dbUser.invitationId) {
//       throw new ErrorSet.notFound(
//         "Unable to locate users invitation record to resend"
//       );
//     }

//     await clerk.invitations.revokeInvitation(dbUser.invitationId);

//     const invite = await clerk.invitations.createInvitation({
//       emailAddress: dbUser.email,
//       redirectUrl: env.NCCL_APP_URL.concat("/sign-up"),
//       publicMetadata: {
//         db_id: dbUser.id,
//         role: dbUser.roleId,
//       },
//     });

//     await db.user.update({
//       where: {
//         id: dbUser.id,
//       },
//       data: {
//         invitationId: invite.id,
//         invitedAt: new Date(),
//       },
//     });

//     const data = await serialize(ResendInviteUserResponseSchema, {
//       message: `Successfully re-invited ${dbUser.email}`,
//     });

//     return c.json(data);
//   }
// );

user.all(() => {
  throw new ErrorSet.notFound();
});
