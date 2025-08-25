import type { PrismaConfig } from "prisma";

export default {
  migrations: {
    seed: "npx tsx ./seed/seed.ts",
  },
} satisfies PrismaConfig;
