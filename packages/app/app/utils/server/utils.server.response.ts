import { data } from "react-router";
import { z, ZodError } from "zod";

export type ErrorPayloadValidation<K extends string = string> = {
  error_type: "validation";
  errors: Partial<Record<K, string[]>>;
};
export type ErrorPayloads<K extends string = string> =
  | { error_type: "unknown"; message: string }
  | { error_type: "unauthenticated"; message: string }
  | { error_type: "unauthorized"; message: string }
  | { error_type: "not_found"; message: string }
  | { error_type: "method_not_allowed"; message: string }
  | ErrorPayloadValidation<K>;

/**
 * Base Error class for which to extend errors off of
 */
export abstract class ApiError<
  T extends ErrorPayloads["error_type"],
  K extends string = string,
> extends Error {
  abstract status: number;
  abstract error_type: T;
  errors: Partial<Record<K, string[]>> = {};

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toResponse<EK extends K = K>(): {
    error_type: T;
    status: number;
    message: string;
    errors: Partial<Record<EK, string[]>>;
  } {
    return {
      error_type: this.error_type,
      status: this.status,
      message: this.message,
      errors: this.errors,
    };
  }
}

class UnauthenticatedError extends ApiError<"unauthenticated"> {
  status = 401;
  error_type = "unauthenticated" as const;

  constructor(message = "Not authenticated") {
    super(message);
  }
}

class UnauthorizedError extends ApiError<"unauthorized"> {
  status = 403;
  error_type = "unauthorized" as const;

  constructor(message = "You are not authorized to access this resource.") {
    super(message);
  }
}

class NotFoundError extends ApiError<"not_found"> {
  status = 404;
  error_type = "not_found" as const;

  constructor(
    message = "The requested resource you are looking for does not exist."
  ) {
    super(message);
  }
}

class MethodNotAllowedError extends ApiError<"method_not_allowed"> {
  status = 405;
  error_type = "method_not_allowed" as const;

  constructor(
    method?: string,
    message = `This ${method} method is not supported`
  ) {
    super(message);
  }
}

class ValidationError<K extends string> extends ApiError<"validation", K> {
  status = 400;
  error_type = "validation" as const;

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
  invalid: ValidationError,
};

export const ServerResponse = {
  success<T extends Record<string, unknown>>(payload: T) {
    return data(payload);
  },
  error<T extends string>(
    error: unknown
  ): ReturnType<typeof data<ErrorPayloads & { message: string }>> {
    let err = error;
    if (err instanceof ZodError) {
      const flatErr = z.flattenError(err);
      err = new ValidationError(flatErr.fieldErrors);
    }
    if (err instanceof ApiError) {
      return data(err.toResponse<T>(), {
        status: err.status,
        headers: new Headers({ "content-type": "application/json" }),
      });
    }

    if (error instanceof Error) {
      return data(
        {
          error_type: "unknown",
          message: error.message ?? "An unknown error occurred.",
          errors: {},
        },
        { status: 500 }
      );
    }

    return data(
      {
        error_type: "unknown",
        message: "An unknown error occurred.",
        errors: {},
      },
      { status: 500 }
    );
  },
};
