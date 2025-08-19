import { createMiddleware } from "hono/factory";

import { getEnvVar } from "../utils/util.envVar.js";
import { createPrismaClient } from "../utils/util.prisma.js";

declare module "hono" {
  interface ContextVariableMap {
    db: ReturnType<typeof createPrismaClient>;
  }
}

export const prismaMiddleware = createMiddleware(async (c, next) => {
  const env = getEnvVar(c);
  const connectionString = env.DATABASE_URL;
  const prismaClient = createPrismaClient(connectionString);
  c.set("db", prismaClient);
  await next();
});
