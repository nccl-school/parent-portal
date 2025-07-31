import type { PrismaConfig } from "prisma";

import { loadEnv } from "./scripts/load-env.script.js";

loadEnv();

export default {
  // now you can use process.env variables
} satisfies PrismaConfig;
