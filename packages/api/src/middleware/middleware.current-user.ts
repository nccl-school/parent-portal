import { createMiddleware } from "hono/factory";
import { getAuth } from "@hono/clerk-auth";

import type { Roles } from "../features/role/role.utils.js";
import { ErrorSet } from "../utils/util.errors.js";

export const cacheTagsMiddleware = {
  CURRENT_USER: "get_current_user",
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      db_id: string;
    };
  }
  interface UserPublicMetadata {
    role?: Roles;
    db_id: string;
  }
}

declare module "hono" {
  interface ContextVariableMap {
    currentUser: {
      id: string;
      roleId: Roles;
    };
  }
}

export const currentUserMiddleware = createMiddleware(async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    console.log("User does not have a clerk session");
    throw new ErrorSet.unauthenticated();
  }
  const clerk_id = auth.userId;
  const db_id = auth.sessionClaims.metadata.db_id;

  const db = c.get("db");
  let user = await db.user.findFirst({
    where: {
      OR: [
        {
          id: db_id,
        },
        {
          authId: clerk_id,
        },
      ],
    },
  });
  console.log("Checking if user exists in DB", user?.id);

  if (!user) {
    console.log("User does not exist in the DB");
    const clerk = c.get("clerk");
    console.log("Fetching clerk user", auth.userId);
    const clerkUser = await clerk.users.getUser(auth.userId);
    console.log("Creating db user");
    user = await db.user.create({
      data: {
        authId: auth.userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        roleId: clerkUser.publicMetadata.role ?? "USER",
      },
    });
    console.log("Creating the user in the db", user);
  }

  console.log("Setting the user to the context", user);
  c.set("currentUser", {
    id: user.id,
    roleId: user.roleId,
  });

  await next();
});
