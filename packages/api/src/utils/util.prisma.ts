import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { ErrorSet } from "./util.errors.js";

type PrismaErrorKeys = "unique_constraint_violation" | "data_validation";
const prismaErrorCodeMap: { [key: string]: PrismaErrorKeys } = {
  P2002: "unique_constraint_violation",
  P2007: "data_validation",
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

    const key = prismaErrorCodeMap[error.code];
    const message = messages?.[key] ?? messages.fallback;
    throw new ErrorSet.badRequest(message);
  }
}
