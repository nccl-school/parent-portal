import type { ZodSchema } from "zod";
import type { ZodError as Zod4Error } from "zod/v4";
import { flattenError } from "zod/v4";

import { ErrorSet } from "../../dist-client/utils/util.errors.js";

export async function serialize<S extends ZodSchema, D>(
  schema: S,
  data: D,
  message?: string
) {
  try {
    const json = schema.parseAsync(data);
    return json;
  } catch (error) {
    const err = flattenError(error as unknown as Zod4Error);
    const errObj =
      Object.keys(err.fieldErrors).length === 0
        ? { __untyped__: err.formErrors }
        : err.fieldErrors;
    throw new ErrorSet.validation(errObj, message);
  }
}
