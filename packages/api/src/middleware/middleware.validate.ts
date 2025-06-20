import type { ValidationTargets } from "hono";
import { validator as zValidator } from "hono-openapi/zod";
import { type ZodSchema } from "zod";
import { z, type ZodError } from "zod/v4";

import { ErrorSet } from "#errors";

/**
 * Custom validator middleware that will throw
 * pre-defined errors instead of pre-canned errors.
 */
export const validate = <
  T extends ZodSchema,
  Target extends keyof ValidationTargets,
>(
  target: Target,
  schema: T
) =>
  zValidator(target, schema, (res) => {
    if (!res.success) {
      const flatErr = z.flattenError(res.error as ZodError);
      let message: string | undefined;
      switch (target) {
        case "param":
          message = `There was an error when validating the params of the request.`;
          break;

        default:
          message = undefined;
      }
      throw new ErrorSet.validation(flatErr.fieldErrors, message);
    }
  });
