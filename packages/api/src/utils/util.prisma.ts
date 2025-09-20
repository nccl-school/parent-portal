import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaPg } from "@prisma/adapter-pg";
import { ENV_RUNTIME } from "@nccl/env";

import { ErrorSet } from "./util.errors.js";

import { PrismaClient } from "../_generated/prisma/client.js";
import { PrismaClientKnownRequestError } from "../_generated/prisma/internal/prismaNamespace.js";

neonConfig.webSocketConstructor = ws;

type PrismaErrorKeys =
  | "unique_constraint_violation"
  | "data_validation"
  | "fk_violation";
const prismaErrorCodeMap: { [key: string]: PrismaErrorKeys } = {
  P2002: "unique_constraint_violation",
  P2007: "data_validation",
  P2003: "fk_violation",
};

export async function tryPrisma<T>(
  dbPromise: Promise<T>,
  messages: Partial<{ [key in PrismaErrorKeys]: string }> & { fallback: string }
) {
  try {
    return await dbPromise;
  } catch (error) {
    console.error(error);

    if (!(error instanceof PrismaClientKnownRequestError)) {
      throw new ErrorSet.serverError(messages.fallback);
    }

    const key = prismaErrorCodeMap[error.code];
    const message = messages?.[key] ?? messages.fallback;
    throw new ErrorSet.badRequest(message);
  }
}

export function createPrismaClient(databaseUrl?: string): PrismaClient {
  const { NCCL_ENVIRONMENT, DATABASE_URL } = ENV_RUNTIME.getAll();
  const connectionString = databaseUrl ?? DATABASE_URL;

  const adapter =
    NCCL_ENVIRONMENT === "local" || NCCL_ENVIRONMENT === "test"
      ? new PrismaPg({ connectionString }) // local  & test env = docker-compose
      : new PrismaNeon({ connectionString }); // higher env = neon

  const prisma = new PrismaClient({ adapter });

  // .$extends(withAccelerate());

  return prisma;
}
