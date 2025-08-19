import { type SupermenvConfig } from "supermenv";

import { ENV_SCHEMA } from "../src/schema.js";

const config = {
  dotEnvPaths: ["../../../.env"],
  schema: ENV_SCHEMA,
} satisfies SupermenvConfig;

export default config;
