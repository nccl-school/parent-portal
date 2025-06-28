import { z } from "zod";
import leoProfanity from "leo-profanity";

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

export const zCleanStringSchema = z
  .string()
  .refine((val) => !leoProfanity.check(val), {
    message: "Please remove inappropriate language.",
  });
