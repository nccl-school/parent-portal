import { createMiddleware } from "hono/factory";
// import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";
import type { Context } from "hono";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaClient } from "@prisma/client";

import { getEnvVar } from "../utils/util.envVar.js";

neonConfig.webSocketConstructor = ws;

declare module "hono" {
  interface ContextVariableMap {
    db: ReturnType<typeof getPrisma>;
  }
}

function getPrisma<C extends Context>(c: C) {
  const env = getEnvVar(c);
  const connectionString = env.DATABASE_URL;

  const adapter =
    process.env.NODE_ENV === "development"
      ? new PrismaPg({ connectionString }) // local env = docker-compose
      : new PrismaNeon({ connectionString }); // higher env = neon

  const prisma = new PrismaClient({ adapter });
  // .$extends(withAccelerate());

  return prisma;
}

export const prismaMiddleware = createMiddleware(async (c, next) => {
  const client = getPrisma(c);
  c.set("db", client);
  await next();
});
