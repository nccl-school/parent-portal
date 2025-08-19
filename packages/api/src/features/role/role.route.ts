import { Hono } from "hono";
import { ENV } from "@nccl/env";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

import { GetRoleListResponseSchema } from "./role.utils.js";

import { authorize } from "../../middleware/middleware.authorize.js";
import { serialize } from "../../utils/util.serialize.js";
import { PrismaClient } from "../../_generated/prisma/client.js";

export const role = new Hono();

export function createPrismaClient(databaseUrl?: string) {
  const { NODE_ENV, DATABASE_URL } = ENV.getAllEnvVars();
  const connectionString = databaseUrl ?? DATABASE_URL;

  const adapter =
    NODE_ENV !== "production"
      ? new PrismaPg({ connectionString }) // local env = docker-compose
      : new PrismaNeon({ connectionString }); // higher env = neon

  const prisma = new PrismaClient({ adapter });

  // .$extends(withAccelerate());

  return prisma;
}

// GET /api/role | Get a list of roles
role.get("/", authorize("ADMIN"), async (c) => {
  const db = c.get("db");
  const roles = await db.role.findMany();
  const data = await serialize(GetRoleListResponseSchema, roles);
  return c.json(data);
});
