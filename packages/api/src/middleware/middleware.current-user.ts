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
    };
  }
  interface UserPublicMetadata {
    role?: Roles;
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
  console.log("Getting the users id");
  if (!auth?.userId) {
    console.log("User is not authenticated with Clerk");
    throw new ErrorSet.unauthenticated();
  }
  console.log("Getting the users id", auth.userId);

  const db = c.get("db");
  console.log("Getting the user record from the db");
  let user = await db.user.findUnique({
    where: {
      id: auth.userId,
    },
  });
  console.log("Getting the user record from the db", user);

  if (!user) {
    console.log("User does not exist in the DB");
    const clerk = c.get("clerk");
    console.log("Getting the user records from clerk");
    const clerkUser = await clerk.users.getUser(auth.userId);
    console.log("Getting the user record from clerk", clerkUser);
    console.log("Creating the user in the db");
    user = await db.user.create({
      data: {
        id: auth.userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        roleId: "USER",
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
