import type { ZodSchema } from "zod";
import type z from "zod";
import { ZodError, flattenError } from "zod/v4";

import { ServerError } from "../utils/util.handleError.js";

export class ApiClient {
  basePath: string;

  constructor({ basePath }: { basePath: string }) {
    this.basePath = basePath;
  }

  #serialize<S>(schema: ZodSchema<S>, res: unknown) {
    try {
      return schema.parse(res);
    } catch (error) {
      if (error instanceof ZodError) {
        const err = flattenError(error as ZodError);
        throw new ServerError.validation(
          err.fieldErrors,
          "Serialization error"
        );
      }
      throw new ServerError.internal("Failed to serialize for unknown reason.");
    }
  }

  #validateSchema<T extends ZodSchema>(
    schema: T,
    data: unknown,
    options: {
      message: string;
    }
  ): z.infer<T> {
    try {
      return schema.parse(data);
    } catch (error) {
      const flatErr = flattenError(error as ZodError);
      throw new ServerError.validation(flatErr.fieldErrors, options.message);
    }
  }

  #makeQueryString<T extends ZodSchema = ZodSchema>(
    query?: [schema: T, data: unknown]
  ): string {
    if (!query) return "";

    const [schema, raw] = query;
    const data = this.#validateSchema<T>(schema, raw, {
      message:
        "Error when attempting to validate the query parameters of the request",
    });

    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(data ?? {})) {
      urlSearchParams.set(key, String(value));
    }
    if (urlSearchParams.size !== 0) {
      return "?".concat(urlSearchParams.toString());
    }
    return "";
  }

  #makePathname<T extends ZodSchema = ZodSchema>(
    url: string,
    params?: [schema: T, data: unknown]
  ): string {
    const pathname = this.basePath.concat(url);
    if (!params) return pathname;
    const [schema, raw] = params;
    const _data = this.#validateSchema<T>(schema, raw, {
      message:
        "Error when attempting to validate the query parameters of the request",
    });
    return pathname;
  }

  protected async _get<
    S extends ZodSchema,
    Q extends ZodSchema = ZodSchema,
    P extends ZodSchema = ZodSchema,
  >({
    path,
    query,
    params,
    serializer,
  }: {
    path: string;
    params?: [schema: P, data: unknown];
    query?: [schema: Q, data: unknown];
    serializer: S;
  }): Promise<z.output<S>> {
    // Assemble the request
    const headers = new Headers({
      "content-type": "application/json",
    });

    // Assemble the URL
    const queryString = this.#makeQueryString(query);
    const pathname = this.#makePathname(path, params);
    const url = `${pathname}${queryString}`;

    // Fetch the data
    const res = await fetch(url, { headers });
    const json = await res.json();

    // Serialize the data
    const data = this.#serialize(serializer, json);
    return data;
  }
}
