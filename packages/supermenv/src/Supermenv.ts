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

  #setError(key: keyof T, message: string) {
    this.#errors = Object.assign(this.#errors ?? {}, {
      [key]: message,
    } as ErrorReport<T>);
  }

  #deleteError(key: keyof T) {
    delete this.#errors[key];
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
    this.#log(`Setting envVar "${String(key)}": ${value}`);
    // parse value
    const res = this.#parseEnvVar(key, value);
    if (!res.isValid) {
      return this.#setError(key, res.reason);
    }
    this.#deleteError(key);
    process.env[String(key)] = String(value); // Not sure if needed but here to keep the process in sync
    this.#envVars[key] = value;
  }

  /**
   * Provided a key and value, this method will try to obtain a definition
   * for the key. If it doesn't find a registered key, it will throw. If it does
   * find a key, it will attempt to parse it based upon it's definition and
   * then return a status
   */
  #parseEnvVar<K extends keyof T>(
    envKey: K,
    // RATIONALE: We use any so the parser can determine the value
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    envValue: any
  ):
    | { isValid: false; reason: string }
    | { isValid: true; value: string | number | boolean } {
    const def = this.#varDefs[envKey];
    if (!def) {
      throw new Error(
        `${this.#logPrefix} Unknown Environment Variable: "${String(envKey)}" has not been registered as a possible environment variable. This most likely means you're trying to mutate the process incorrectly. Please add this variable to the "vars" key of the "${this.#name}" constructor.`
      );
    }
    this.#setEnvVar(envKey, undefined);

    const isNullishOrEmpty = envValue == null || envValue === "";

    if (isNullishOrEmpty) {
      return {
        isValid: false,
        reason: `Missing environment variable`,
      };
    }

    switch (def.type) {
      case "string":
        return { isValid: true, value: envValue };

      case "number": {
        const num = Number(envValue);
        if (Number.isNaN(num)) {
          return {
            isValid: false,
            reason: `"${envValue}" cannot be coerced to a number`,
          };
        }
        return { isValid: true, value: num };
      }

      case "boolean": {
        const bool = envValue === "true" || envValue === "1";
        return { isValid: true, value: bool };
      }

      case "url":
        try {
          new URL(envValue);
        } catch {
          return {
            isValid: false,
            reason: `"${envValue}" is not a valid URL`,
          };
        }
        return {
          isValid: true,
          value: envValue,
        };

      case "email":
        if (!/^[^@]+@[^@]+\.[^@]+$/.test(envValue)) {
          return {
            isValid: false,
            reason: `"${envValue}" is not a valid email address.`,
          };
        }
        return {
          isValid: true,
          value: envValue,
        };

      case "literal":
        if (!def.values.includes(envValue)) {
          return {
            isValid: false,
            reason: `"${envValue}" does not match one of the available values "${def.values.join(" | ")}"`,
          };
        }
        return { isValid: true, value: envValue };

      default:
        return exhaustiveMatchGuard(def);
    }
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
    for (const key of Object.keys(this.#varDefs)) {
      const envKey = key as keyof T;
      const envValue = source[key];

      const res = this.#parseEnvVar(envKey, envValue);
      if (!res.isValid) {
        this.#setError(envKey, res.reason);
        continue;
      }
      this.#setEnvVar(envKey, res.value);
    }
    this.#log("Parsing envVars... done.");
  }
}
