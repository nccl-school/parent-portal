import { createMiddleware } from "hono/factory";
import { ENV } from "@nccl/env";

import { createResendClient } from "../utils/util.resend.js";

declare module "hono" {
  interface ContextVariableMap {
    resend: ReturnType<typeof createResendClient>;
  }
}

export const emailMiddleware = createMiddleware(async (c, next) => {
  const resend = createResendClient(ENV.getEnvVar("RESEND_API_KEY"));
  c.set("resend", resend);

  await next();
});
