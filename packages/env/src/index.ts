import path from "node:path";

import { Supermenv } from "supermenv";

const dotEnvPaths = [path.resolve(import.meta.dirname, "../../../.env")];

export const ENV_CI = new Supermenv({
  name: "CI",
  dotEnvPaths,
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
  name: "CD",
  dotEnvPaths,
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

export const ENV_TEST = new Supermenv({
  name: "TEST",
  dotEnvPaths,
  description:
    "A set of environment variables needed to run the test environment and adjust some of the runtime variables",
  vars: {
    POSTGRES_DB: {
      type: "string",
      description: "The port that the DB will run on in the test dockerfile",
    },
    POSTGRES_PORT: {
      type: "number",
      description: "The port that the DB will run on in the test dockerfile",
    },
    POSTGRES_USER: {
      type: "string",
      description: "The port that the DB will run on in the test dockerfile",
    },
    POSTGRES_PASSWORD: {
      type: "string",
      description: "The password for the test postgres user",
    },
    APP_PORT: {
      type: "number",
      description: "The port that the app will run on in the test dockerfile",
    },
    API_PORT: {
      type: "number",
      description: "The port that the API will run on in the test dockerfile",
    },
  },
});

export const ENV_RUNTIME = new Supermenv({
  name: "RUNTIME",
  dotEnvPaths,
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
      values: ["local", "test", "dev", "prod"],
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
  },
});

// TODO: Update e2e setup script (match with CI / make CI call the shell script (the latter))
// TODO: Get tests working locally
// TODO: Cleanup scripts to test
// TODO: Separate out the scripts into their own directories

export function validateCI() {
  // Validate CI right out of the gate for caching purposes
  ENV_CI.validate();

  // Set some variables based upon known values
  // and some implicit env vars
  const db = "nccl-parents-db-test";
  const dbPort = 11002;
  const user = "postgres";
  const pw = ENV_TEST.getOne("POSTGRES_PASSWORD");
  const appPort = 11000;
  const apiPort = 11001;

  // Set some of them
  ENV_TEST.set("APP_PORT", appPort);
  ENV_TEST.set("API_PORT", apiPort);
  ENV_TEST.set("POSTGRES_DB", db);
  ENV_TEST.set("POSTGRES_PORT", dbPort);
  ENV_TEST.set("POSTGRES_USER", user);

  // Dynamically set some runtime URLs based upon
  // the derived env vars
  const DATABASE_URL = `postgresql://${user}:${pw}@db:${dbPort}/${db}`;
  ENV_RUNTIME.set("DATABASE_URL", DATABASE_URL);
  ENV_RUNTIME.set("NCCL_APP_URL", `http://app:${appPort}`);
  ENV_RUNTIME.set("NCCL_API_URL", `http://app:${apiPort}`);

  // Validate that the dynamically composed TEST vars
  // have successfully been set and loaded
  ENV_RUNTIME.validate();
  ENV_TEST.validate();
}
