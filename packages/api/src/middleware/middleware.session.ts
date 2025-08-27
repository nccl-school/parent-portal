import { createMiddleware } from "hono/factory";

import { ErrorSet } from "../utils/util.errors.js";
import { auth } from "../auth.js";

declare module "hono" {
  interface ContextVariableMap {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  }
}

export const sessionMiddleware = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    console.log("User does not have a valid session");
    throw new ErrorSet.unauthenticated();
  }
  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});
