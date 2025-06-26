import { z } from "zod";

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
