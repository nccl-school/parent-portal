import { ErrorResponseSchema, type ErrorResponse } from "@nccl/api/client";
import type { ReactNode } from "react";
import { match } from "ts-pattern";
import z from "zod";

import { placeholder } from "./isomorphic";

export class DateFactory {
  private static instance: DateFactory;

  private constructor() {}

  static getInstance(): DateFactory {
    if (!DateFactory.instance) {
      DateFactory.instance = new DateFactory();
    }
    return DateFactory.instance;
  }

  format(
    dateInput: Date | string | number | null,
    pattern:
      | "MM/DD/YYYY"
      | "YYYY-MM-DD"
      | "MMM DD, YYYY"
      | "Relative" = "MM/DD/YYYY"
  ): string {
    if (!dateInput) return "Unknown date";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) throw new Error("Invalid date");

    if (pattern === "Relative") {
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();

      if (diffMs < 0) return "In the future";

      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      if (diffMinutes < 1) return "Just now";
      if (diffMinutes < 60)
        return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;

      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24)
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;

      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return "Yesterday";
      if (diffDays <= 6) return `${diffDays} days ago`;

      // fallback to default pattern
      pattern = "MM/DD/YYYY";
    }

    switch (pattern) {
      case "MM/DD/YYYY":
        return this.formatWithParts(date, "MM/DD/YYYY");
      case "YYYY-MM-DD":
        return this.formatWithParts(date, "YYYY-MM-DD");
      case "MMM DD, YYYY":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
      default:
        return date.toDateString();
    }
  }

  private formatWithParts(date: Date, pattern: string): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    switch (pattern) {
      case "MM/DD/YYYY":
        return `${mm}/${dd}/${yyyy}`;
      case "YYYY-MM-DD":
        return `${yyyy}-${mm}-${dd}`;
      default:
        throw new Error("Unsupported pattern");
    }
  }
}

export const dates = DateFactory.getInstance();

export function isError(data: unknown): data is ErrorResponse {
  return typeof data === "object" && data !== null && "error_type" in data;
}

export type ObjectKeys<T> = Extract<keyof T, string>;

export function getValidationErrors<K extends Record<string, unknown>>(
  data: unknown
): Partial<Record<ObjectKeys<K>, string[]>> {
  const parsed = ErrorResponseSchema.safeParse(data);
  if (!parsed.success) return {};
  if (parsed.data.error_type !== "validation") return {};
  return parsed.data.errors as Partial<Record<ObjectKeys<K>, string[]>>;
}

const authErrorCodes = [
  "USER_NOT_FOUND",
  "FAILED_TO_CREATE_USER",
  "FAILED_TO_CREATE_SESSION",
  "FAILED_TO_UPDATE_USER",
  "FAILED_TO_GET_SESSION",
  "INVALID_PASSWORD",
  "INVALID_EMAIL",
  "INVALID_EMAIL_OR_PASSWORD",
  "SOCIAL_ACCOUNT_ALREADY_LINKED",
  "PROVIDER_NOT_FOUND",
  "INVALID_TOKEN",
  "ID_TOKEN_NOT_SUPPORTED",
  "FAILED_TO_GET_USER_INFO",
  "USER_EMAIL_NOT_FOUND",
  "EMAIL_NOT_VERIFIED",
  "PASSWORD_TOO_SHORT",
  "PASSWORD_TOO_LONG",
  "USER_ALREADY_EXISTS",
  "EMAIL_CAN_NOT_BE_UPDATED",
  "CREDENTIAL_ACCOUNT_NOT_FOUND",
  "SESSION_EXPIRED",
  "FAILED_TO_UNLINK_LAST_ACCOUNT",
  "ACCOUNT_NOT_FOUND",
  "USER_ALREADY_HAS_PASSWORD",
];

export function getAuthError(data: unknown) {
  const parsed = z
    .object({ message: z.string(), code: z.string() })
    .safeParse(data);
  if (!parsed.success) return undefined;
  const { code, message } = parsed.data;
  if (!authErrorCodes.includes(code)) return undefined;
  return message;
}

type ParseFetcherResult<D> =
  | { status: "loading" }
  | { status: "error"; error: Extract<D, ErrorResponse> }
  | { status: "ok"; data: Exclude<D, ErrorResponse> };

export function parseFetcherData<D>(data: D): ParseFetcherResult<D> {
  if (typeof data === "undefined") {
    return { status: "loading" };
  }
  if (isError(data)) {
    return { status: "error", error: data as Extract<D, ErrorResponse> };
  }

  return { status: "ok", data: data as Exclude<D, ErrorResponse> };
}

export function parseLoaderData<D>(loaderData: D) {
  const res = parseFetcherData<D>(loaderData);
  switch (res.status) {
    case "ok":
      return res.data as NonNullable<Exclude<D, ErrorResponse>>;

    default:
      return undefined;
  }
}

export function renderLoaderData<D>(
  data: D,
  callbacks: {
    loading?: ReactNode;
    ok: (d: NonNullable<Exclude<D, ErrorResponse>>) => ReactNode;
  }
) {
  const res = parseFetcherData<D>(data);
  return match(res)
    .with({ status: "loading" }, () =>
      callbacks.loading ? callbacks.loading : placeholder
    )
    .with({ status: "error" }, () => placeholder)
    .with({ status: "ok" }, (state) => {
      if (!state.data) return;
      return callbacks.ok(state.data as NonNullable<Exclude<D, ErrorResponse>>);
    })
    .exhaustive();
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove special characters except spaces and hyphens
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/--+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}
