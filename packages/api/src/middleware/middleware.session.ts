import { createMiddleware } from "hono/factory";
import { logContext } from "@nccl/logger/context";

import { ErrorSet } from "../utils/util.errors.js";
import { auth } from "../auth.js";
import { LOG } from "../utils/util.logger.js";

declare module "hono" {
  interface ContextVariableMap {
    user: typeof auth.$Infer.Session.user;
    session: typeof auth.$Infer.Session.session;
  }
}

export const LOG_MID_SESSION = LOG.feature("middleware:session");

export const sessionMiddleware = createMiddleware(async (c, next) => {
  LOG_MID_SESSION.info("Fetching user session");
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    LOG_MID_SESSION.info("User does not have a valid session");
    throw new ErrorSet.unauthenticated();
  }
  LOG_MID_SESSION.info("User has existing & valid session", session);
  LOG_MID_SESSION.debug("Setting user and session to request context");

  logContext.set("userId", session.user.id);
  logContext.set(
    "userFullName",
    `${session.user.firstName} ${session.user.lastName}`
  );

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});
