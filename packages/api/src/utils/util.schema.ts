import { z } from "zod/v4";
import leoProfanity from "leo-profanity";
import type { ZodRawShape, ZodString } from "zod/v4";

export const zDateStringSchema = z.preprocess(
  (val) => {
    if (typeof val === "string" || val instanceof Date) {
      const date = new Date(val);
      return isNaN(date.getTime()) ? undefined : val;
    }
    return undefined;
  },
  z.union([z.string(), z.date()])
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

export function checkProfanity<T extends ZodString>(s: T) {
  return s.refine((val) => !leoProfanity.check(val), {
    message: "Please remove inappropriate language.",
  });
}

export function zString(options?: { required?: string; profanity?: boolean }) {
  const baseSchema = z.string().refine(
    (value) => {
      return options?.required && value;
    },
    { error: options?.required }
  );
  if (!options?.profanity) return checkProfanity(baseSchema);
  return baseSchema;
}

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
