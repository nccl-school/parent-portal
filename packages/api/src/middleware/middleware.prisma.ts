import { createMiddleware } from "hono/factory";
import { withAccelerate } from "@prisma/extension-accelerate";
import type { Context } from "hono";

import { PrismaClient } from "#prisma/edge.js";

declare module "hono" {
  interface ContextVariableMap {
    db: ReturnType<typeof getPrisma>;
  }
}

function getPrisma<C extends Context>(_c: C) {
  const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return prisma;
}

export const prismaMiddleware = createMiddleware(async (c, next) => {
  const client = getPrisma(c);
  c.set("db", client);
  await next();
});
