import path from "node:path";

import { ENV_CI, ENV_RUNTIME, ENV_TEST } from "@nccl/env";

const envFilePath = path.resolve(import.meta.dirname, "../.env");

ENV_RUNTIME.loadDotEnvs([envFilePath]);
ENV_CI.loadDotEnvs([envFilePath]);

ENV_RUNTIME.load();
ENV_CI.load();

ENV_CI.validate();
ENV_RUNTIME.validate();

// Load the test environment variables
ENV_TEST.load();

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

// Dynamically set the new DB URL based upon the env vars
const DATABASE_URL = `postgresql://${user}:${pw}@db:${dbPort}/${db}`;
ENV_RUNTIME.set("DATABASE_URL", DATABASE_URL);
ENV_RUNTIME.set("NODE_ENV", "production");
ENV_RUNTIME.set("NCCL_APP_URL", `http://app:${appPort}`);
ENV_RUNTIME.set("NCCL_API_URL", `http://app:${apiPort}`);

ENV_TEST.validate();
