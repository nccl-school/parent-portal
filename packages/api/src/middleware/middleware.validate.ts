import type { ValidationTargets } from "hono";
import type { ZodType } from "zod/v4";
import { z } from "zod/v4";
import { zValidator } from "@hono/zod-validator";

import { ErrorSet } from "../utils/util.errors.js";

/**
 * Custom validator middleware that will throw
 * pre-defined errors instead of pre-canned errors.
 */
export function validate<
  T extends ZodType,
  Target extends keyof ValidationTargets,
>(target: Target, schema: T) {
  return zValidator(target, schema, (res) => {
    if (!res.success) {
      const flatErr = z.flattenError(res.error);
      console.error(flatErr);
      throw new ErrorSet.validation(
        flatErr.fieldErrors,
        `"${target}" validation failed.`
      );
    }
  });
}
