import type z from "zod/v4";
import { flattenError, ZodError, type ZodType } from "zod/v4";

import { deserializeError, ErrorSet } from "../utils/util.errors.js";

export type ApiClientOptions = {
  rootUrl: string;
  rootUrlSegments: string[];
  headers: Headers;
};

export class ApiClient {
  protected _basePath: string;
  #rootUrl: string;
  #rootUrlSegments: string[];
  #requestHeaders: Headers;

  constructor({
    basePath,
    rootUrl,
    rootUrlSegments,
    headers,
  }: {
    basePath: string;
  } & ApiClientOptions) {
    this._basePath = basePath;
    this.#rootUrl = rootUrl;
    this.#rootUrlSegments = rootUrlSegments;
    this.#requestHeaders = headers;
  }

  #validateSchema<T extends ZodType>(
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
        const err = flattenError(error);
        const errors =
          Object.keys(err.fieldErrors).length === 0
            ? { __untyped__: err.formErrors }
            : err.fieldErrors;
        throw new ErrorSet.validation(errors, options.message);
      }
      throw new ErrorSet.serverError("Failed to serialize for unknown reason.");
    }
  }

  #serialize<S>(schema: ZodType<S>, res: unknown) {
    return this.#validateSchema(schema, res, {
      message: `🚨 Client re-serialization error 🚨
  
There was an error when trying to serialize what was returned from the server:
  - Ensure that the endpoint serializer is being awaited
  - Ensure that the correct data is being returned
`,
    });
  }

  #makeQueryString<T extends ZodType = ZodType>(
    query?: [schema: T, data: z.infer<T> | undefined]
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

  #makePathname<T extends ZodType = ZodType>(
    url: string,
    params?: [schema: T, data: z.infer<T>]
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
    S extends ZodType,
    P extends ZodType = ZodType,
    B extends ZodType = ZodType,
  >({
    path,
    params,
    body,
    serializer,
    method,
  }: {
    path: string;
    params?: [schema: P, data: z.infer<P>];
    body?: [schema: B, data: z.infer<B>];
    serializer: S;
    method: "POST" | "PUT";
  }): Promise<z.output<S>> {
    // Assemble the request
    const headers = this.#requestHeaders;
    headers.set("content-type", "application/json");

    // Assemble the URL
    const pathname = this.#makePathname(path, params);
    const url = this.#makeURL({ pathname });

    // Assemble the request body
    const reqInit: RequestInit = {
      method,
      headers,
    };
    if (body) {
      const [bodySchema, bodyRaw] = body;
      const parsedBody = this.#validateSchema(bodySchema, bodyRaw, {
        message: "Invalid request body",
      });
      reqInit.body = JSON.stringify(parsedBody);
    }

    // Fetch the data
    const req = new Request(url, reqInit);
    const res = await fetch(req);
    const json = await res.json();

    if (!res.ok) {
      throw deserializeError(json, req);
    }

    // Serialize the data

    const data = this.#serialize(serializer, json);
    return data as z.output<S>;
  }

  protected async _get<
    S extends ZodType,
    Q extends ZodType = ZodType,
    P extends ZodType = ZodType,
  >({
    path,
    query,
    params,
  }: {
    path: string;
    params?: [schema: P, data: z.infer<P>];
    query?: [schema: Q, data: z.infer<Q> | undefined];
    serializer: S;
  }): Promise<z.output<S>> {
    // Assemble the request
    const headers = this.#requestHeaders;
    headers.set("content-type", "application/json");

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
