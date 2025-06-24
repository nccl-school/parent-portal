import type { ZodSchema } from "zod";
import type { ZodError } from "zod/v4";
import z4 from "zod/v4";

import { ErrorSet } from "#errors";

export function serialize<S extends ZodSchema, D>(schema: S, data: D) {
  const json = schema.safeParse(data);
  if (!json.success) {
    throw new ErrorSet.validation(
      z4.flattenError(json.error as unknown as ZodError).fieldErrors,
      "Serialization error"
    );
  }
  return json.data as D;
}
