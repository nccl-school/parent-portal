import path from "node:path";

import type { PrismaConfig } from "prisma";
import { ENV_RUNTIME } from "@nccl/env";

// Just ensure that the DB URL has been set since that's
// all we need here for the the migrations and the
// client generation to work
ENV_RUNTIME.load({ paths: [path.resolve(import.meta.dirname, "../../.env")] });
ENV_RUNTIME.getOne("DATABASE_URL");

export default {
  migrations: {
    seed: "tsx ./prisma/seed.ts",
  },
  // now you can use process.env variables
} satisfies PrismaConfig;
