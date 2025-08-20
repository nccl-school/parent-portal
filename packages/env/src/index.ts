import path from "node:path";

import { Supermenv } from "supermenv";

export const ENV = new Supermenv({
  dotEnvPaths: [path.resolve(import.meta.dirname, "../../../.env")],
  vars: {
    // Repo Vars
    NEON_PROJECT_ID: { type: "string" },
    HIGHLIGHT_PROJECT_ID: { type: "string" },
    GCP_PROJECT_ID: { type: "string" },
    // Repo Secrets
    GOOGLE_CALENDAR_API_KEY: { type: "string" },
    GOOGLE_CALENDAR_ID_NCCL_PUBLIC: { type: "string" },
    TURBO_TOKEN: { type: "string" },
    TURBO_TEAM_ID: { type: "string" },
    SUPER_USER_EMAIL: { type: "email" },
    SUPER_USER_PASSWORD: { type: "string" },
    SUPER_USER_NAME: { type: "string" },
    SUPER_USER_IMAGE_URL: { type: "url" },
    // Environment Vars
    NODE_ENV: { type: "literal", values: ["development", "production"] },
    NCCL_ENVIRONMENT: { type: "literal", values: ["local", "dev", "prod"] },
    NCCL_APP_URL: { type: "url" },
    NCCL_API_URL: { type: "url" },
    POSTGRES_DB: { type: "string" },
    POSTGRES_USER: { type: "string" },
    // --- Environment Secrets ---
    DATABASE_URL: { type: "string" },
    GCP_CLOUD_STORAGE_BUCKET: {
      type: "string",
      description: "The bucket name where resources, images, etc... are stored",
    },
    GOOGLE_APPLICATION_CREDENTIALS: {
      type: "string",
      description:
        "An absolute file path to a JSON file that has the tokens required needed to interact with the GCP Api.",
    },
    BETTER_AUTH_SECRET: {
      type: "string",
      description:
        "The authentication secret key needed to encrypt and code JWT & sessions",
    },
    RESEND_API_KEY: {
      type: "string",
      description:
        "The Resend API key needed to be able to send transactional emails",
    },
  },
});
