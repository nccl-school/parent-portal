import type { Context } from "hono";
import { env } from "hono/adapter";

export function getEnvVar<C extends Context>(c: C) {
  return env<{
    CLERK_WEBHOOK_SIGNING_SECRET: string;
  }>(c);
}
