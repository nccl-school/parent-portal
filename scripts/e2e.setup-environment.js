import path from "node:path";
import { writeFile } from "node:fs/promises";

import { ENV_RUNTIME, ENV_TEST, ENV_CI } from "@nccl/env";

console.log("Validating env vars");
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
const DATABASE_URL = `postgresql://${user}:${pw}@db:5432/${db}`;
ENV_RUNTIME.set("NODE_ENV", "production");
ENV_RUNTIME.set("DATABASE_URL", DATABASE_URL);
ENV_RUNTIME.set("NCCL_APP_URL", `http://localhost:${appPort}`);
ENV_RUNTIME.set("NCCL_API_URL", "http://api:8080"); // this is so the app can call the API on the docker container network

// Validate that the dynamically composed TEST vars
// have successfully been set and loaded
ENV_RUNTIME.validate();
ENV_TEST.validate();

const test = ENV_TEST.print();
const run = ENV_RUNTIME.print();

console.log(`Creating ".env.spec" file...`);
const filePath = path.resolve(import.meta.dirname, "../.env.spec");
const contents = `${test}\n${run}`;
await writeFile(filePath, contents, { encoding: "utf-8" });
console.log(`Creating ".env.spec" file... done.`);
