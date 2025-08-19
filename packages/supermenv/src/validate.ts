import { config } from "dotenv";
import { z, type ZodObject } from "zod";

export function validate<T extends ZodObject>(
  schema: T,
  options?: {
    /**
     * An array of absolute paths to load variables
     * from .env files
     */
    envFilePaths?: string[];
  }
) {
  const envFilePaths = options?.envFilePaths ?? [];
  if (envFilePaths.length !== 0) {
    console.log("envFilePaths is populated. Loading `.env` files");
    config({ path: envFilePaths });
  }
  const res = schema.safeParse(schema, process.env as object);
  if (!res.success) {
    const errors = z.prettifyError(res.error);
    throw errors;
  }
  return res.data;
}
