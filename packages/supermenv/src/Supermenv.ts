import { config } from "dotenv";

import { exhaustiveMatchGuard } from "./utils.js";

type PrimitiveSimple = "string" | "number" | "boolean" | "url" | "email";
type PrimitiveLiteral = "literal";

export type SupermenvVarValue = { optional?: boolean; description?: string } & (
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
  [K in keyof T]: T[K]["optional"] extends true
    ? TypeFor<T[K]["type"]> | undefined
    : TypeFor<T[K]["type"]>;
};

export class Supermenv<T extends Record<string, SupermenvVarValue>> {
  #varDefs: T;
  #errors: [string, string][];
  #source: NodeJS.ProcessEnv;
  #envVars: SupermenvEnvVars<T> | undefined;
  #dotEnvPaths: string[];

  constructor(options: { vars: T; dotEnvPaths?: string[] }) {
    this.#dotEnvPaths = options.dotEnvPaths ?? [];
    this.#varDefs = options.vars;
    this.#errors = [];
    this.#source = process.env;
    this.load = this.load.bind(this);
  }

  load() {
    this.loadDotEnvPaths(this.#dotEnvPaths);
    console.log("Validating environment vars...");
    this.#validate();
    console.log("Validating environment vars... done.");
  }

  loadDotEnvPaths(paths: string[]) {
    if (paths.length === 0) return;
    console.log("Loading Dotenv files...", paths);
    config({ path: paths });
    console.log("Loading Dotenv files... done.");
  }

  #logError(key: keyof T, message: string) {
    this.#errors.push([String(key), message]);
  }

  #getEnvVars() {
    if (!this.#envVars) {
      throw new Error(
        "EnvVars have yet to be validated. Ensure you're calling the 'load' method in order to validate and set the environment vars"
      );
    }
    return this.#envVars;
  }

  getAll() {
    const vars = this.#getEnvVars();
    return vars;
  }

  getOne(key: keyof T) {
    const vars = this.#getEnvVars();
    return vars[key];
  }

  #validate() {
    // If there aren't any errors and the vars already exist
    if (this.#errors.length === 0 && this.#envVars) {
      return this.#envVars;
    }

    this.#errors = [];
    let out: SupermenvEnvVars<T> = {} as SupermenvEnvVars<T>;

    for (const [key, def] of Object.entries(this.#varDefs)) {
      const envKey = key as keyof T;
      const envValue = this.#source[key];
      const isNullishOrEmpty = envValue == null || envValue === "";

      if (isNullishOrEmpty && def.optional) {
        out = Object.assign(out, { [envKey]: undefined });
        continue;
      }

      if (isNullishOrEmpty) {
        this.#logError(envKey, `Missing environment variable`);
        continue;
      }

      switch (def.type) {
        case "string":
          out = Object.assign(out, { [envKey]: envValue });
          break;

        case "number": {
          const num = Number(envValue);
          if (Number.isNaN(num)) {
            this.#logError(
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
            this.#logError(envKey, `"${envValue}" is not a valid URL`);
            continue;
          }
          out = Object.assign(out, { [envKey]: envValue });
          break;

        case "email":
          if (!/^[^@]+@[^@]+\.[^@]+$/.test(envValue)) {
            this.#logError(
              envKey,
              `"${envValue}" is not a valid email address.`
            );
            continue;
          }
          out = Object.assign(out, { [envKey]: envValue });
          break;

        case "literal":
          if (!def.values.includes(envValue)) {
            this.#logError(
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

    if (this.#errors.length > 0) {
      throw new Error(`Environment Variable validation failed:
${this.#errors.map(([envKey, error]) => `\n\t - ${envKey}: ${error}`)}
`);
    }

    this.#envVars = out;
  }
}
