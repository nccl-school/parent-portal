import { createMiddleware } from "hono/factory";
import { ENV } from "@nccl/env";

import { createPrismaClient } from "../utils/util.prisma.js";

declare module "hono" {
  interface ContextVariableMap {
    db: ReturnType<typeof createPrismaClient>;
  }
}

export const prismaMiddleware = createMiddleware(async (c, next) => {
  const connectionString = ENV.getEnvVar("DATABASE_URL");
  const prismaClient = createPrismaClient(connectionString);
  c.set("db", prismaClient);
  await next();
});
