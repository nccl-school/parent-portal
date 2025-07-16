import type { PrismaConfig } from "prisma";

import { loadEnv } from "./scripts/load-env.script.js";

loadEnv();

console.log(process.env);

export default {
  earlyAccess: true,
  // now you can use process.env variables
} satisfies PrismaConfig;
