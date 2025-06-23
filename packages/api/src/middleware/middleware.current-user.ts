import { createMiddleware } from "hono/factory";
import { getAuth } from "@hono/clerk-auth";

import type { UserRole } from "#features/user/user.utils.js";
import { ErrorSet } from "#errors";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
    };
  }
  interface UserPublicMetadata {
    role?: UserRole;
  }
}

declare module "hono" {
  interface ContextVariableMap {
    user: {
      id: string;
      role: UserRole;
    };
  }
}

export const currentUserMiddleware = createMiddleware(async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    throw new ErrorSet.unauthenticated();
  }

  c.set("user", {
    id: auth.userId,
    role: auth.sessionClaims.metadata?.role ?? "parent",
  });
  await next();
});
