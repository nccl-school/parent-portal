import type { PrismaConfig } from "prisma";

export default {
  migrations: {
    seed:
      process.env.NODE_ENV === "development"
        ? "npx tsx ./src/seed.ts"
        : "node ./dist/seed.js",
  },
} satisfies PrismaConfig;
