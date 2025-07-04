import { createMiddleware } from "hono/factory";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";
import type { Context } from "hono";

import { PrismaClient } from "../_generated/prisma/default.js";
import { getEnvVar } from "../utils/util.envVar.js";

declare module "hono" {
  interface ContextVariableMap {
    db: ReturnType<typeof getPrisma>;
  }
}

function getPrisma<C extends Context>(c: C) {
  const env = getEnvVar(c);
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  // .$extends(withAccelerate());
  return prisma;
}

export const prismaMiddleware = createMiddleware(async (c, next) => {
  const client = getPrisma(c);
  c.set("db", client);
  await next();
});
