import { existsSync } from "node:fs";

import { config } from "dotenv";
import pc from "picocolors";

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
type ErrorReport<T extends Record<string, SupermenvVarValue>> = {
  [key in keyof T]: string;
};
type LoadOptions = {
  paths?: string[];
  /**
   * A boolean value that when truthy
   * will log out a
   */
  logLoadReport?: boolean;
};

export class Supermenv<T extends Record<string, SupermenvVarValue>> {
  #varDefs: T;
  #errors: ErrorReport<T> = {} as ErrorReport<T>;
  #envVars: SupermenvEnvVars<T> = {} as SupermenvEnvVars<T>;
  #name: string;
  #logPrefix: string;

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
    this.#name = options.name;
    this.#logPrefix = `[${this.#name}]`;

    // hydrate immediately
    this.load({ paths: options.dotEnvPaths });
  }

  #log(message: string, ...args: string[]) {
    console.log(`${this.#logPrefix} ${message}`, ...args);
  }

  #addError(key: keyof T, message: string) {
    this.#errors = Object.assign(this.#errors ?? {}, {
      [key]: message,
    } as ErrorReport<T>);
  }

  #hasErrors() {
    return Object.keys(this.#errors ?? {}).length > 0;
  }

  getAll() {
    this.validate();
    if (this.#hasErrors()) {
      const errorReport = this.#printReport();
      throw new Error(errorReport);
    }
    return this.#envVars as ValidatedSupermenvEnvVars<T>;
  }

  getOne<K extends keyof T>(key: K) {
    this.#log(`Getting envVar "${String(key)}"`);
    const envVar = this.#envVars[key];
    if (!envVar) {
      throw new Error(
        pc.red(`[${this.#name}] "${String(key)}" has not been set.`)
      );
    }
    return envVar as TypeFor<T[K]["type"]>;
  }

  set<K extends keyof T>(key: K, value: TypeFor<T[K]["type"]>) {
    process.env[String(key)] = String(value);
    this.#envVars[key] = value;
  }

  #printReport(): string {
    const report: string[] = [];

    function addReportLine(envKey: keyof T, value: unknown) {
      report.push(`\n  - ${String(envKey)}: ${value}`);
    }

    for (const [envKey, envValue] of Object.entries(this.#envVars)) {
      const envVar = envKey as keyof T;
      const error = this.#errors[envVar];
      addReportLine(
        error ? pc.bgRed(String(envVar)) : envVar,
        error ? pc.red(error) : envValue
      );
    }

    return report.join("");
  }

  validate() {
    const report = this.#printReport();
    if (this.#hasErrors()) {
      throw new Error(
        `${this.#logPrefix} Validating... 🚨 Failure:${report}\n`
      );
    }
    this.#log(`Validating... 🎉 Successful!${report}\n`);
  }

  /**
   * Loads environment variables from the process.env
   * and then validates then against the definitions that
   * were provided in the vars key in the constructor
   */
  loadAndValidate(options?: LoadOptions) {
    this.load(options);
    this.validate();
  }

  #setEnvVar<K extends keyof T>(
    key: K,
    value: string | number | boolean | undefined
  ) {
    this.#envVars[key] = value as TypeFor<T[K]["type"]>;
  }

  /**
   * Reads and then parses environment variables from process.env
   */
  load(options?: LoadOptions) {
    // Load the envVars using dotenv if they exist
    const paths = (options?.paths ?? []).filter((path) => existsSync(path));
    if (paths.length !== 0) {
      this.#log("Loading vars from...", ...paths);
      config({ path: paths, override: false });
      this.#log("Loading vars from... done.");
    }

    const source = process.env;

    this.#errors = {} as ErrorReport<T>;

    this.#log("Parsing envVars...");
    for (const [key, def] of Object.entries(this.#varDefs)) {
      const envKey = key as keyof T;
      const envValue = source[key];
      const isNullishOrEmpty = envValue == null || envValue === "";

      if (isNullishOrEmpty) {
        this.#setEnvVar(envKey, undefined);
        this.#addError(envKey, `Missing environment variable`);
        continue;
      }

      switch (def.type) {
        case "string":
          this.#setEnvVar(envKey, envValue);
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
          this.#setEnvVar(envKey, num);
          break;
        }

        case "boolean": {
          const bool = envValue === "true" || envValue === "1";
          this.#setEnvVar(envKey, bool);
          break;
        }

        case "url":
          try {
            new URL(envValue);
          } catch {
            this.#addError(envKey, `"${envValue}" is not a valid URL`);
            continue;
          }
          this.#setEnvVar(envKey, envValue);
          break;

        case "email":
          if (!/^[^@]+@[^@]+\.[^@]+$/.test(envValue)) {
            this.#addError(
              envKey,
              `"${envValue}" is not a valid email address.`
            );
            continue;
          }
          this.#setEnvVar(envKey, envValue);
          break;

        case "literal":
          if (!def.values.includes(envValue)) {
            this.#addError(
              envKey,
              `"${envValue}" does not match one of the available values "${def.values.join(" | ")}"`
            );
            continue;
          }
          this.#setEnvVar(envKey, envValue);
          break;

        default:
          exhaustiveMatchGuard(def);
      }
    }
    this.#log("Parsing envVars... done.");
  }
}
