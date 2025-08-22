import type { PrismaConfig } from "prisma";
import { ENV_RUNTIME, validateCI } from "@nccl/env";

if (ENV_RUNTIME.getOne("NCCL_ENVIRONMENT") === "test") {
  validateCI();
}

// Just ensure that the DB URL has been set since that's
// all we need here for the the migrations and the
// client generation to work
ENV_RUNTIME.getOne("DATABASE_URL");

export default {
  migrations: {
    seed: "tsx ./prisma/seed.ts",
  },
} satisfies PrismaConfig;
