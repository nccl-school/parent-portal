import { config } from "dotenv";

import { exhaustiveMatchGuard } from "./utils.js";

type PrimitiveSimple = "string" | "number" | "boolean" | "url" | "email";
type PrimitiveLiteral = "literal";

export type SupermenvVarValue = { description?: string } & (
  | {
      type: PrimitiveSimple;
    }
  | {
      type: "literal";
      values: string[];
    }
);

type TypeFor<T extends PrimitiveSimple | PrimitiveLiteral> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "url"
        ? string
        : T extends "email"
          ? string
          : T extends "literal"
            ? string
            : never;

export type SupermenvEnvVars<T extends Record<string, SupermenvVarValue>> = {
  [K in keyof T]: TypeFor<T[K]["type"]> | undefined;
};
export type ValidatedSupermenvEnvVars<
  T extends Record<string, SupermenvVarValue>,
> = {
  [K in keyof T]: TypeFor<T[K]["type"]>;
};

export class Supermenv<T extends Record<string, SupermenvVarValue>> {
  #varDefs: T;
  #errors: [string, string][];
  #envVars: SupermenvEnvVars<T>;
  #name: string;

  constructor(options: {
    vars: T;
    dotEnvPaths?: string[];
    name: string;
    description?: string;
  }) {
    this.load = this.load.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);

    this.#varDefs = options.vars;
    this.#errors = [];
    this.#name = options.name;
    this.#envVars = Object.keys(options.vars).reduce<SupermenvEnvVars<T>>(
      (accum, key) => {
        const envKey = key as keyof T;
        return Object.assign(accum, { [envKey]: undefined });
      },
      {} as SupermenvEnvVars<T>
    );
  }

  #log(message: string, ...args: string[]) {
    console.log(`[${this.#name}] ${message}`, ...args);
  }

  loadDotEnvs(paths: string[]) {
    if (paths.length === 0) return;
    // TODO: Check if path exists
    this.#log("Loading Dotenv files...", ...paths);
    config({ path: paths });
    this.#log("Loading Dotenv files... done.");
  }

  #addError(key: keyof T, message: string) {
    this.#errors.push([String(key), message]);
  }

  #printErrors() {
    return `[${this.#name}] Env validation failed:
${this.#errors.map(([envKey, error]) => `\n\t - ${envKey}: ${error}`)}
`;
  }

  getAll() {
    this.validate();
    if (this.#errors.length > 0) {
      const errorReport = this.#printErrors();
      throw new Error(errorReport);
    }
    return this.#envVars as ValidatedSupermenvEnvVars<T>;
  }

  getOne<K extends keyof T>(key: K) {
    console.log("getting env var", key);
    console.log("process.env", process.env);
    console.log("thisEnvVars", this.#envVars);
    const envVar = this.#envVars[key];
    if (!envVar) {
      throw new Error(`[${this.#name}] "${String(key)}" has not been set.`);
    }
    return envVar as TypeFor<T[K]["type"]>;
  }

  set<K extends keyof T>(key: K, value: TypeFor<T[K]["type"]>) {
    this.#envVars[key] = value;
  }

  validate() {
    if (this.#errors.length > 0) {
      throw new Error(`Environment Variable validation failed:
${this.#errors.map(([envKey, error]) => `\n\t - ${envKey}: ${error}`)}
`);
    }
  }

  /**
   * Reads and then parses environment variables from process.env
   */
  load() {
    this.#log("Loading env vars...");
    const source = process.env;

    this.#errors = [];
    let out: SupermenvEnvVars<T> = {} as SupermenvEnvVars<T>;

    for (const [key, def] of Object.entries(this.#varDefs)) {
      const envKey = key as keyof T;
      const envValue = source[key];
      const isNullishOrEmpty = envValue == null || envValue === "";

      if (isNullishOrEmpty) {
        out = Object.assign(out, { [envKey]: undefined });
        continue;
      }

      if (isNullishOrEmpty) {
        this.#addError(envKey, `Missing environment variable`);
        continue;
      }

      switch (def.type) {
        case "string":
          out = Object.assign(out, { [envKey]: envValue });
          break;

        case "number": {
          const num = Number(envValue);
          if (Number.isNaN(num)) {
            this.#addError(
              envKey,
              `"${envValue}" cannot be coerced to a number`
            );
            continue;
          }
          out = Object.assign(out, { [envKey]: num });
          break;
        }

        case "boolean": {
          const bool = envValue === "true" || envValue === "1";
          out = Object.assign(out, { [envKey]: bool });
          break;
        }

        case "url":
          try {
            new URL(envValue);
          } catch {
            this.#addError(envKey, `"${envValue}" is not a valid URL`);
            continue;
          }
          out = Object.assign(out, { [envKey]: envValue });
          break;

        case "email":
          if (!/^[^@]+@[^@]+\.[^@]+$/.test(envValue)) {
            this.#addError(
              envKey,
              `"${envValue}" is not a valid email address.`
            );
            continue;
          }
          out = Object.assign(out, { [envKey]: envValue });
          break;

        case "literal":
          if (!def.values.includes(envValue)) {
            this.#addError(
              envKey,
              `"${envValue}" does not match one of the available values "${def.values.join(" | ")}"`
            );
            continue;
          }
          out = Object.assign(out, { [envKey]: envValue });
          break;

        default:
          exhaustiveMatchGuard(def);
      }
    }
    this.#log("Loading env vars... done.");
    this.#envVars = out;
    const numOfVars = Object.keys(this.#envVars).length;
    this.#log(`Loaded ${numOfVars} variables`);
  }
}
