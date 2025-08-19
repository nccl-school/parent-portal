import { z } from "supermenv";

const REPO_VARS = z.object({
  NEON_PROJECT_ID: z.string().meta({
    description:
      "The Neon BD project ID. This is used so it can be referred to when building the prisma schema to query the DB per environment.",
  }),
  HIGHLIGHT_PROJECT_ID: z.string().meta({
    description:
      "The Highlight.io project ID. This is used to provide monitoring using Highlight.io",
  }),
  GCP_PROJECT_ID: z.string(),
  NEON_API_KEY: z.string(),
});

const REPO_SECRETS = z.object({
  GOOGLE_CALENDAR_API_KEY: z.string(),
  GOOGLE_CALENDAR_ID_NCCL_PUBLIC: z.string(),
  TURBO_TOKEN: z.string(),
  TURBO_TEAM_ID: z.string(),
  SUPER_USER_EMAIL: z.email(),
  SUPER_USER_PASSWORD: z.string(),
  SUPER_USER_NAME: z.string(),
  SUPER_USER_IMAGE_URL: z.url(),
});

const ENVIRONMENT_VARS = z.object({
  NODE_ENV: z.literal(["development", "production"]),
  NCCL_ENVIRONMENT: z.literal(["local", "dev", "prod"]).meta({
    description:
      "The name of the deployed environment. Helps when using 3rd party service that require the specific environment that the code is running in.",
  }),
  NCCL_APP_URL: z
    .url()
    .meta({ description: "The URL where the NCCL Web App is hosted" }),
  NCCL_API_URL: z
    .url()
    .meta({ description: "The URL where the NCCL API is hosted" }),
  POSTGRES_DB: z.string(),
  POSTGRES_USER: z.string(),
});

const ENVIRONMENT_SECRETS = z.object({
  DATABASE_URL: z.string(),
  GCP_CLOUD_STORAGE_BUCKET: z.string().meta({
    description: "The bucket name where resources, images, etc... are stored",
  }),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().meta({
    description:
      "An absolute file path to a JSON file that has the tokens required needed to interact with the GCP Api.",
  }),
  BETTER_AUTH_SECRET: z.string().meta({
    description:
      "The authentication secret key needed to encrypt and code JWT & sessions",
  }),
  RESEND_API_KEY: z.string().meta({
    description:
      "The Resend API key needed to be able to send transactional emails",
  }),
});

export const ENV_SCHEMA = z.object({
  ...REPO_VARS.shape,
  ...REPO_SECRETS.shape,
  ...ENVIRONMENT_VARS.shape,
  ...ENVIRONMENT_SECRETS.shape,
});
