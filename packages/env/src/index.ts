import path from "node:path";

import { Supermenv } from "supermenv";

export const ENV_CI = new Supermenv({
  vars: {
    // repo|secrets
    TURBO_TOKEN: {
      type: "string",
      description: "The Turborepo token used to speed up builds in CI",
    },
    TURBO_TEAM_ID: {
      type: "string",
      description:
        "The Vercel Team ID used to house the Turborepo cache for this project",
    },
  },
});

export const ENV_CD = new Supermenv({
  vars: {
    // repo|vars
    GCP_PROJECT_ID: {
      type: "string",
      description:
        "The GCP project that the cloud services are contained within",
    },
    GCP_REGION: {
      type: "string",
      description:
        "The region the API and the App containers are deployed to within GCP",
    },
    // env|vars
    CLOUD_RUN_APP_SERVICE_NAME: { type: "string" },
    CLOUD_RUN_API_SERVICE_NAME: { type: "string" },
    GCP_GAR_REPO_APP: { type: "string" },
    GCP_GAR_REPO_API: { type: "string" },
  },
});

export const ENV = new Supermenv({
  dotEnvPaths: [path.resolve(import.meta.dirname, "../../../.env")],
  vars: {
    // Environment Vars
    NODE_ENV: {
      type: "literal",
      values: ["development", "production"],
      description:
        "The node environment that is used to determine build strategy, compression, etc...",
    },
    NCCL_ENVIRONMENT: {
      type: "literal",
      values: ["local", "ci", "dev", "prod"],
      description:
        "The deployed environment of the app. Used to detect specific services and add labels to give visual indicators of which environment is being worked in.",
    },
    NCCL_APP_URL: {
      type: "url",
      description:
        "The location where the webapp is hosted. Used to construct emails links, etc...",
    },
    NCCL_API_URL: {
      type: "url",
      description:
        "The URL where the API is hosted. Used to dynamically construct URLs, emails, etc...",
    },
    GCP_CLOUD_STORAGE_BUCKET: {
      type: "string",
      description:
        "The name of the storage bucket used to store resources, images, documents, etc...",
    },
    GOOGLE_CALENDAR_ID_NCCL_PUBLIC: {
      type: "string",
      description:
        "The public ID of the calendar that the NCCL school maintains.",
    },
    // --- Environment Secrets ---
    DATABASE_URL: {
      type: "string",
      description:
        "The DB connection string used to migrate and connect to the DB using prisma",
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
    GOOGLE_API_KEY: {
      type: "string",
      description:
        "The API key used to query various google services like Drive, Calendar, etc...",
    },
    SUPER_USER_EMAIL: { type: "email" },
    SUPER_USER_PASSWORD: { type: "string" },
    SUPER_USER_NAME: { type: "string" },
    SUPER_USER_IMAGE_URL: { type: "url" },
  },
});
