import { createMiddleware } from "hono/factory";
import { ENV_RUNTIME } from "@nccl/env";

import { createPrismaClient } from "../utils/util.prisma.js";
import type { PrismaClient } from "../_generated/prisma/client.js";

declare module "hono" {
  interface ContextVariableMap {
    db: PrismaClient;
  }
}

export const prismaMiddleware = createMiddleware(async (c, next) => {
  const connectionString = ENV_RUNTIME.getOne("DATABASE_URL");
  const prismaClient = createPrismaClient(connectionString) as PrismaClient;
  c.set("db", prismaClient);
  await next();
});
