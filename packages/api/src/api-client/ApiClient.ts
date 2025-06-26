import { type ZodSchema, ZodError } from "zod";
import type z from "zod";
import { flattenError, type ZodError as Zod4Error } from "zod/v4";

import { deserializeError, ErrorSet } from "../utils/util.errors.js";

export type ApiClientOptions = {
  rootUrl: string;
  rootUrlSegments: string[];
};

export class ApiClient {
  protected _basePath: string;
  #rootUrl: string;
  #rootUrlSegments: string[];

  constructor({
    basePath,
    rootUrl,
    rootUrlSegments,
  }: {
    basePath: string;
  } & ApiClientOptions) {
    this._basePath = basePath;
    this.#rootUrl = rootUrl;
    this.#rootUrlSegments = rootUrlSegments;
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
      if (error instanceof ZodError) {
        const err = flattenError(error as unknown as Zod4Error);
        const errors =
          Object.keys(err.fieldErrors).length === 0
            ? { __untyped__: err.formErrors }
            : err.fieldErrors;
        throw new ErrorSet.validation(errors, options.message);
      }
      throw new ErrorSet.serverError("Failed to serialize for unknown reason.");
    }
  }

  #serialize<S>(schema: ZodSchema<S>, res: unknown) {
    return this.#validateSchema(schema, res, {
      message: "Client re-serialization error",
    });
  }

  #makeQueryString<T extends ZodSchema = ZodSchema>(
    query?: [schema: T, data: unknown]
  ): string {
    if (!query) return "";

    const [schema, raw] = query;
    if (!raw) return "";

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
    const normalizedUrl = url === "/" ? "" : url;

    const pathname = this._basePath.concat(normalizedUrl);
    if (!params) return pathname;
    const [schema, raw] = params;
    if (!raw) return pathname;

    const data = this.#validateSchema<T>(schema, raw, {
      message:
        "Error when attempting to validate the path parameters of the request",
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

  #makeURL({
    pathname,
    queryString = "",
  }: {
    pathname: string;
    queryString?: string;
  }): string {
    return `${this.#rootUrl}/${this.#rootUrlSegments.join("/")}${pathname}${queryString}`;
  }

  protected async _mutateJSON<
    S extends ZodSchema,
    P extends ZodSchema = ZodSchema,
    B extends ZodSchema = ZodSchema,
  >({
    path,
    params,
    body,
    serializer,
    method,
  }: {
    path: string;
    params?: [schema: P, data: unknown];
    body: [schema: B, data: unknown];
    serializer: S;
    method: "POST" | "PUT";
  }) {
    // Assemble the request
    const headers = new Headers({
      "content-type": "application/json",
    });
    const pathname = this.#makePathname(path, params);
    const url = this.#makeURL({ pathname });

    const [bodySchema, bodyRaw] = body;
    const parsedBody = this.#validateSchema(bodySchema, bodyRaw, {
      message: "Invalid request body",
    });

    // Fetch the data
    const req = new Request(url, {
      method,
      headers,
      body: JSON.stringify(parsedBody.data),
    });
    const res = await fetch(req);
    const json = await res.json();

    if (!res.ok) {
      throw deserializeError(json, req);
    }

    // Serialize the data

    const data = this.#serialize(serializer, json);
    return data;
  }

  protected async _get<
    S extends ZodSchema,
    Q extends ZodSchema = ZodSchema,
    P extends ZodSchema = ZodSchema,
  >({
    path,
    query,
    params,
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
    const url = this.#makeURL({ pathname, queryString });

    // Fetch the data
    const req = new Request(url, { headers });
    const res = await fetch(req);
    const json = await res.json();

    if (!res.ok) {
      throw deserializeError(json, req);
    }

    return json as z.output<S>;
  }
}
