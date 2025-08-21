import type { PrismaConfig } from "prisma";
import { loadEnvVars } from "@nccl/env";

loadEnvVars();

export default {
  migrations: {
    seed: "tsx ./prisma/seed.ts",
  },
  // now you can use process.env variables
} satisfies PrismaConfig;
