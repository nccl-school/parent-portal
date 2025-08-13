import type { Context } from "hono";
import { env } from "hono/adapter";

export function getEnvVar<C extends Context>(c: C) {
  return env<{
    CLERK_WEBHOOK_SIGNING_SECRET: string;
    NCCL_API_EMAIL: string;
    NODE_ENV: string;
    NCCL_APP_URL: string;
    DATABASE_URL: string;
    GCP_CLOUD_STORAGE_BUCKET: string;
    GOOGLE_CALENDAR_API_KEY: string;
  }>(c);
}
