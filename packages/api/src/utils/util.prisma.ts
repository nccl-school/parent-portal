import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { PrismaPg } from "@prisma/adapter-pg";

import { ErrorSet } from "./util.errors.js";

import { PrismaClient } from "../_generated/prisma/client.js";

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
    if (!(error instanceof PrismaClientKnownRequestError)) {
      throw new ErrorSet.serverError(messages.fallback);
    }

    console.log(error);

    const key = prismaErrorCodeMap[error.code];
    const message = messages?.[key] ?? messages.fallback;
    throw new ErrorSet.badRequest(message);
  }
}

export function createPrismaClient(databaseUrl?: string) {
  const connectionString = databaseUrl ?? process.env.DATABASE_URL;

  const adapter =
    process.env.NODE_ENV !== "production"
      ? new PrismaPg({ connectionString }) // local env = docker-compose
      : new PrismaNeon({ connectionString }); // higher env = neon

  const prisma = new PrismaClient({ adapter });

  // .$extends(withAccelerate());

  return prisma;
}
