import { createMiddleware } from "hono/factory";
import { Resend } from "resend";

import { getEnvVar } from "../utils/util.envVar.js";

declare module "hono" {
  interface ContextVariableMap {
    resend: ReturnType<typeof createResend>;
  }
}

function createResend(apiKey: string): Resend {
  return new Resend(apiKey);
}

export const emailMiddleware = createMiddleware(async (c, next) => {
  const { RESEND_API_KEY } = getEnvVar(c);
  const resend = createResend(RESEND_API_KEY);
  c.set("resend", resend);

  await next();
});
