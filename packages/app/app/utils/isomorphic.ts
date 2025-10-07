import { css } from "@linaria/core";
import { makeResponsive } from "@nccl/theme";
import type { ActionFunctionArgs, UIMatch } from "react-router";
import type { ZodObject, ZodType } from "zod";
import { z } from "zod";
import { Logger } from "@nccl/logger";

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
): Promise<z.core.output<T>> {
  const formDataObj = Object.fromEntries(formData.entries());
  return z.parse(schema, formDataObj) as z.core.output<T>;
}

export async function getFormData<
  A extends ActionFunctionArgs,
  T extends ZodObject,
>(args: A, schema: T) {
  const formData = await args.request.formData();
  const formDataObj = Object.fromEntries(formData.entries());
  const res = await schema.safeParseAsync(formDataObj);
  return res;
}

export function createValidator<T extends ZodObject>(schema: T) {
  return (formData: FormData) => validateFormData(schema, formData);
}

type RouteHandle<T> = { mobileTitle: string | ((args: T) => string) };
export function createRouteHandle<T>({ mobileTitle }: RouteHandle<T>) {
  return {
    mobileTitle,
  };
}

export function getMobileTitle<T extends (UIMatch | undefined)[]>(matches: T) {
  return matches.reduce<string | null>((accum, match) => {
    const mobileTitle = (match?.handle as RouteHandle<unknown> | undefined)
      ?.mobileTitle;
    if (!mobileTitle) return accum;
    if (typeof mobileTitle === "function") {
      return mobileTitle(match?.loaderData);
    }
    return mobileTitle;
  }, null);
}

export const CLASSES = {
  mobileOnly: css`
    ${makeResponsive({ from: "laptop" })} {
      display: none !important;
    }
  `,
  desktopOnly: css`
    ${makeResponsive({ to: "laptop" })} {
      display: none !important;
    }
  `,
};

export const LOG = new Logger({ bufferSize: 100 });
