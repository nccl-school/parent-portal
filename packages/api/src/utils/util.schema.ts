import { z } from "zod/v4";
import leoProfanity from "leo-profanity";
import type { ZodRawShape } from "zod/v4";

export const zDateStringSchema = z.preprocess(
  (val) => {
    // If it's a Date instance, convert to ISO string
    if (val instanceof Date) {
      return val.toISOString();
    }
    return val;
  },
  z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  })
);

export const zQueryParam = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((val) => {
    if (val == null || val === "") return undefined;
    return val.replace(/['&|!:*\\]/g, " ");
  })
  .optional();

export const zCleanStringSchema = z
  .string()
  .refine((val) => !leoProfanity.check(val), {
    message: "Please remove inappropriate language.",
  });

export const zMessageSchema = z.object({ message: z.string() });

export function createQuerySchema<T extends ZodRawShape>(shape: T) {
  const baseSchema = z.object(shape).partial(); // makes all fields optional
  return baseSchema.transform((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, v]) => typeof v !== "undefined" && v !== null && v !== ""
      )
    ) as Partial<z.infer<z.ZodObject<T>>>;
  });
}
