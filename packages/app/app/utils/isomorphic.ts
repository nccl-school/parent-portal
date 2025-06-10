import type { ZodObject } from "zod/v4";
import { z } from "zod/v4";

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pause(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const placeholder = "-- --";

export async function validateFormData<T extends ZodObject>(
  schema: T,
  formData: FormData
) {
  return z.parse(schema, Object.fromEntries(formData.entries()));
}

export function createValidator<T extends ZodObject>(schema: T) {
  return (formData: FormData) => validateFormData(schema, formData);
}
