/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodError } from "zod";

const ErrorResponseBase = z.object({
  status: z.number(),
  message: z.string(),
});

export const ErrorResponseSchema = z.discriminatedUnion("error_type", [
  ErrorResponseBase.extend({
    error_type: z.literal("unknown"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("unauthenticated"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("unauthorized"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("method_not_allowed"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("server_error"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("not_found"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("bad_request"),
  }),
  ErrorResponseBase.extend({
    error_type: z.literal("validation"),
    errors: z.record(z.string(), z.array(z.string())),
  }),
]);

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * Base Error class for which to extend errors off of
 */
class ServerError<
  T extends ErrorResponse["error_type"] = ErrorResponse["error_type"],
> extends Error {
  readonly error_type: T;
  readonly status: number;
  readonly errors?: Record<string, string[]>;

  constructor(opts: {
    error_type: T;
    status: number;
    message: string;
    errors?: T extends "validation" ? Record<string, string[]> : never;
  }) {
    super(opts.message);
    this.name = "ApiError";
    this.error_type = opts.error_type;
    this.status = opts.status;

    if (opts.error_type === "validation") {
      this.errors = opts.errors;
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }

  toResponse(): ErrorResponse {
    const payload = {
      error_type: this.error_type,
      status: this.status,
      message: this.message,
      ...(this.error_type === "validation" && this.errors
        ? { errors: this.errors }
        : {}),
    };

    return ErrorResponseSchema.parse(payload); // full runtime validation
  }
}

class ServerErrorUnauthenticated extends ServerError<"unauthenticated"> {
  constructor(message = "You need to sign in to access this resource.") {
    super({ error_type: "unauthenticated", message, status: 401 });
  }
}
class ServerErrorUnauthorized extends ServerError<"unauthorized"> {
  constructor(message = "Not authorized") {
    super({ error_type: "unauthorized", message, status: 403 });
  }
}

class ServerErrorNotFound extends ServerError<"not_found"> {
  constructor(message = "The requested resource does not exist") {
    super({ error_type: "not_found", message, status: 404 });
  }
}

class ServerErrorMethodNotAllowed extends ServerError<"method_not_allowed"> {
  constructor(method: string) {
    super({
      error_type: "method_not_allowed",
      message: `"${method}" is not allowed.`,
      status: 405,
    });
  }
}

class ServerErrorServerError extends ServerError<"server_error"> {
  constructor(reason: string) {
    super({
      error_type: "server_error",
      message: `There was an internal server error: ${reason}`,
      status: 500,
    });
  }
}

class ServerErrorValidation extends ServerError<"validation"> {
  constructor(errors: Record<string, string[]>, message = "Validation failed") {
    super({
      error_type: "validation",
      message,
      status: 400,
      errors,
    });
  }
}

class ServerErrorBadRequest extends ServerError<"bad_request"> {
  constructor(message = "Bad request") {
    super({
      error_type: "bad_request",
      message,
      status: 400,
    });
  }
}

class ServerErrorUnknown extends ServerError<"unknown"> {
  constructor(message = "An unknown error occurred") {
    super({
      error_type: "unknown",
      message,
      status: 500,
    });
  }
}

export const ErrorSet = {
  unauthenticated: ServerErrorUnauthenticated,
  unauthorized: ServerErrorUnauthorized,
  notFound: ServerErrorNotFound,
  methodNotAllowed: ServerErrorMethodNotAllowed,
  serverError: ServerErrorServerError,
  validation: ServerErrorValidation,
  unknown: ServerErrorUnknown,
  badRequest: ServerErrorBadRequest,
};

/**
 * Converts any thrown value into a typed {@link ErrorResponse} payload.
 *
 * This is intended to be used on the server, typically in an error boundary
 * like `app.onError(...)`. It ensures that all responses follow a consistent,
 * JSON-serializable error format that matches your Zod-defined `ErrorResponseSchema`.
 *
 * - If the error is a `ZodError`, it wraps it in a validation error.
 * - If it's already an instance of a known `ServerError`, it serializes it as-is.
 * - If it's a raw object that matches the `ErrorResponseSchema`, it returns that directly.
 * - Otherwise, it falls back to a generic `unknown` error shape.
 *
 * @param error - Any unknown thrown value (typically from a `try/catch` block)
 * @returns A strongly typed `ErrorResponse` object for JSON serialization
 */
export function serializeError(error: unknown): ErrorResponse {
  console.log(error);
  if (error instanceof ZodError) {
    const err = new ErrorSet.validation(z.flattenError(error).fieldErrors);
    return err.toResponse();
  }

  if (error instanceof ServerError) {
    return error.toResponse();
  }

  if (typeof error === "object" || error !== "null") {
    const parsed = ErrorResponseSchema.safeParse(error);
    if (parsed.success) {
      return parsed.data;
    }
  }

  return new ErrorSet.unknown().toResponse();
}

/**
 * Converts a JSON error payload received from an API into a `ServerError` instance.
 *
 * This is intended for client-side use, such as in a `try/catch` around `fetch`.
 * It ensures that any parsed API error response is upgraded into a full
 * class-based `ServerError` that preserves typing and behavior.
 *
 * - If the response payload matches a known error shape (`ErrorResponseSchema`),
 *   it creates the corresponding `ServerError` subclass.
 * - If the shape is invalid, it falls back to `ServerErrorUnknown`.
 *
 * @param errorJson - The parsed JSON body from a failed fetch response
 * @returns A structured `ServerError` instance that can be re-thrown or inspected
 */
export function deserializeError(err: any, method: string): ServerError {
  // The error happened in the library first before the request
  // reached the API so we just re-throw the error. This could happen
  // when validating or parsing the attributes that make up the things
  // to make the request
  if (err instanceof ServerError) {
    return err;
  }

  const parsed = ErrorResponseSchema.safeParse(err);
  if (!parsed.success) {
    return new ErrorSet.serverError("Unknown error.");
  }

  /**
   * The error was on the server so we have to deserialize the error
   * and then throw our own errors to handle this whenever the SDK
   * is being used
   */
  const error = parsed.data;
  switch (error.error_type) {
    case "validation":
      return new ErrorSet.validation(err.errors, err.message);
    case "unauthenticated":
      return new ErrorSet.unauthenticated(err.message);
    case "unauthorized":
      return new ErrorSet.unauthorized(err.message);
    case "not_found":
      return new ErrorSet.notFound(err.message);
    case "method_not_allowed":
      return new ErrorSet.methodNotAllowed(method);
    default:
      return new ErrorSet.serverError(err.message);
  }
}
