/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ClientErrorStatusCode,
  ServerErrorStatusCode,
} from "hono/utils/http-status";
import { z, ZodError } from "zod/v4";

export type ErrorResponse<T extends string> = {
  error_type: T;
  status: ClientErrorStatusCode | ServerErrorStatusCode;
  message: string;
};

export type ErrorResponseUnknown = ErrorResponse<"unknown">;
export type ErrorResponseUnauthenticated = ErrorResponse<"unauthenticated">;
export type ErrorResponseUnauthorized = ErrorResponse<"unauthorized">;
export type ErrorResponseNotFound = ErrorResponse<"not_found">;
export type ErrorResponseMethodNotAllowed = ErrorResponse<"method_not_allowed">;
export type ErrorResponseValidation<K extends string = string> =
  ErrorResponse<"validation"> & {
    errors: Partial<Record<K, string[]>>;
  };

export type ApiErrorResponse<K extends string = string> =
  | ErrorResponseUnknown
  | ErrorResponseUnauthenticated
  | ErrorResponseUnauthorized
  | ErrorResponseNotFound
  | ErrorResponseMethodNotAllowed
  | ErrorResponseValidation<K>;

/**
 * Base Error class for which to extend errors off of
 */
export abstract class ApiError<TError extends ApiErrorResponse> extends Error {
  abstract status: TError["status"];
  abstract error_type: TError["error_type"];
  protected errorMessage: string;

  constructor(message: string) {
    super(message);
    this.errorMessage = message;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toResponse(): TError {
    const base = {
      error_type: this.error_type,
      status: this.status,
      message: this.errorMessage,
    } as any;

    if (this.error_type === "validation") {
      return {
        ...base,
        errors: (this as any).errors,
      };
    }

    return base;
  }
}

class UnauthenticatedError extends ApiError<ErrorResponseUnauthenticated> {
  status: ClientErrorStatusCode = 401;
  error_type = "unauthenticated" as const;

  constructor(message = "Not authenticated") {
    super(message);
  }
}

class UnauthorizedError extends ApiError<ErrorResponseUnauthorized> {
  status: ClientErrorStatusCode = 403;
  error_type = "unauthorized" as const;

  constructor(message = "You are not authorized to access this resource.") {
    super(message);
  }
}

class NotFoundError extends ApiError<ErrorResponseNotFound> {
  status: ClientErrorStatusCode = 404;
  error_type = "not_found" as const;

  constructor(
    message = "The requested resource you are looking for does not exist."
  ) {
    super(message);
  }
}

class MethodNotAllowedError extends ApiError<ErrorResponseMethodNotAllowed> {
  status: ClientErrorStatusCode = 405;
  error_type = "method_not_allowed" as const;

  constructor(
    method?: string,
    message = `This ${method} method is not supported`
  ) {
    super(message);
  }
}

class ValidationError<K extends string> extends ApiError<
  ErrorResponseValidation<K>
> {
  status: ClientErrorStatusCode = 400;
  error_type = "validation" as const;
  errors: Partial<Record<K, string[]>>;

  constructor(
    errors: Partial<Record<K, string[]>>,
    message = "Validation failed"
  ) {
    super(message);
    this.errors = errors;
  }
}

export const ServerError = {
  unauthenticated: UnauthenticatedError,
  unauthorized: UnauthorizedError,
  notFound: NotFoundError,
  methodNotAllowed: MethodNotAllowedError,
  validation: ValidationError,
};

export function handleError(error: unknown) {
  let err = error;
  if (err instanceof ZodError) {
    const flatErr = z.flattenError(err);
    err = new ValidationError(flatErr.fieldErrors);
  }

  if (err instanceof ApiError) {
    console.log("API error");
    return {
      ...err.toResponse(),
      status: err.status,
    };
  }

  if (error instanceof Error) {
    return {
      error_type: "unknown",
      message: error.message ?? "An unknown error occurred.",
      status: 500,
    };
  }

  return {
    error_type: "unknown",
    message: "An unknown error occurred.",
    status: 500,
  };
}
