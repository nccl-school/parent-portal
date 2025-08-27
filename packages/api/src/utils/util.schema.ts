import { z } from "zod";
import leoProfanity from "leo-profanity";
import type { ZodRawShape, ZodString } from "zod";

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

export const zFile = z
  .instanceof(File)
  .refine((file) => file.size > 0, { message: "A file is required" });

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

/**
 * Adds a profanity check to any Zod string schema.
 */
function withProfanityCheck<T extends ZodString>(schema: T): T {
  return schema.refine((val) => !leoProfanity.check(val), {
    message: "Please remove inappropriate language.",
  }) as T;
}

/**
 * @deprecated Please use the zStringRequired or zStringOptional
 */
export function zString(options?: { required?: string }) {
  const baseSchema = z.string().refine(
    (value) => {
      return options?.required && value;
    },
    { error: options?.required }
  );
  return checkProfanity(baseSchema);
}

/**
 * Required string with profanity check.
 * - Enforces presence (`required_error`).
 * - Trims whitespace.
 * - Must be at least 1 non-space character.
 */
export function zStringRequired(message = "A value is required") {
  return withProfanityCheck(
    z.string({ error: message }).trim().min(1, { message }) // empty string check
  );
}

/**
 * Optional string with profanity check.
 * - Trims whitespace.
 * - Profanity check only runs if value is provided.
 */
export function zStringOptional() {
  return withProfanityCheck(z.string().trim()).optional();
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
