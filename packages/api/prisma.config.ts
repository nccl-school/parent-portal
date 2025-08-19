import type { PrismaConfig } from "prisma";
import { ENV } from "@nccl/env";

ENV.validate();

export default {
  migrations: {
    seed: "tsx ./prisma/seed.ts",
  },
  // now you can use process.env variables
} satisfies PrismaConfig;
