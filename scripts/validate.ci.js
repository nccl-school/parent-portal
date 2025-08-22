import { ENV_CI, ENV_RUNTIME, ENV_TEST } from "@nccl/env";

// Validate CI right out of the gate for caching purposes
ENV_CI.validate();

// Set some variables based upon known values
// and some implicit env vars
const db = "nccl-parents-db-test";
const dbPort = 11002;
const user = "postgres";
const pw = ENV_TEST.getOne("E2E_POSTGRES_PASSWORD");
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
