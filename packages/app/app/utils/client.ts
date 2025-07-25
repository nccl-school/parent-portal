import type { ErrorResponse } from "@nccl/api/client";
import type { ReactNode } from "react";
import { match } from "ts-pattern";

import type { ErrorPayloadValidation } from "./server";
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

function isValidationError<T extends string>(
  data: unknown
): data is ErrorPayloadValidation<T> {
  return (
    typeof data === "object" &&
    data !== null &&
    "error_type" in data &&
    (data as ErrorResponse).error_type === "validation"
  );
}

export function isError(data: unknown): data is ErrorResponse {
  return typeof data === "object" && data !== null && "error_type" in data;
}

export function getValidationErrors<K extends string>(
  data: unknown
): ErrorPayloadValidation<K>["errors"] {
  return isValidationError<K>(data) ? data.errors : {};
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

export function renderData<D>(
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
