import type { ZodSchema } from "zod";
import type z from "zod";
import { ZodError, flattenError } from "zod/v4";

import { deserializeError, ErrorSet } from "../utils/util.errors.js";

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
        throw new ErrorSet.validation(err.fieldErrors, "Serialization error");
      }
      throw new ErrorSet.serverError("Failed to serialize for unknown reason.");
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
      throw new ErrorSet.validation(flatErr.fieldErrors, options.message);
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
    const data = this.#validateSchema<T>(schema, raw, {
      message:
        "Error when attempting to validate the query parameters of the request",
    });
    // Replace :params in the path with values from the parsed data
    return pathname.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      const val = (data as Record<string, unknown>)[key];
      if (val === undefined) {
        throw new ErrorSet.serverError(`Missing param for path key :${key}`);
      }
      return encodeURIComponent(String(val));
    });
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
    const req = new Request(url, { headers });
    const res = await fetch(req);
    const json = await res.json();

    if (!res.ok) {
      throw deserializeError(json, req);
    }

    // Serialize the data
    const data = this.#serialize(serializer, json);
    return data;
  }
}
