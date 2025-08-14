import { css } from "@linaria/core";
import type { ZodObject, ZodType } from "zod";
import { z } from "zod";

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pause(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const placeholder = "-- --";

export async function validateFormData<T extends ZodType>(
  schema: T,
  formData: FormData
) {
  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  return z.parse(schema, formDataObj);
}

export function createValidator<T extends ZodObject>(schema: T) {
  return (formData: FormData) => validateFormData(schema, formData);
}

export const backgroundGradient = css`
  background-image: linear-gradient(
    75deg,
    hsla(0deg, 0%, 100%, 0.4) 0%,
    hsla(180deg, 100%, 97%, 0.4) 26%,
    hsla(180deg, 100%, 95%, 0.4) 39%,
    hsla(181deg, 100%, 94%, 0.4) 50%,
    hsla(182deg, 100%, 94%, 0.4) 61%,
    hsla(202deg, 100%, 94%, 0.4) 74%,
    hsla(300deg, 100%, 94%, 0.4) 100%
  );
`;
