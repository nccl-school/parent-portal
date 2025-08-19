import { createMiddleware } from "hono/factory";

import { getEnvVar } from "../utils/util.envVar.js";
import { createResendClient } from "../utils/util.resend.js";

declare module "hono" {
  interface ContextVariableMap {
    resend: ReturnType<typeof createResendClient>;
  }
}

export const emailMiddleware = createMiddleware(async (c, next) => {
  const { RESEND_API_KEY } = getEnvVar(c);
  const resend = createResendClient(RESEND_API_KEY);
  c.set("resend", resend);

  await next();
});
