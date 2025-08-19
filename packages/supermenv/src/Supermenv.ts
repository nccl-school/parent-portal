import path from "node:path";

import type { DotDirResponse } from "dotdir";
import { DotDir } from "dotdir";
import z from "zod";
import { config } from "dotenv";

import { SupermenvConfigSchema, type SupermenvConfig } from "./config.js";

class Supermenv<T extends Record<string, unknown>> {
  #config: DotDirResponse<SupermenvConfig>["config"];
  #meta: DotDirResponse<SupermenvConfig>["meta"];

  constructor(dotDirRes: DotDirResponse<SupermenvConfig>) {
    this.#config = dotDirRes.config;
    this.#meta = dotDirRes.meta;

    const dotEnvRelPaths = (dotDirRes.config.dotEnvPaths ?? []).map(
      (absPath) => {
        return path.resolve(this.#meta.dirPath, absPath);
      }
    );
    this.loadDotEnvFiles(dotEnvRelPaths);
  }

  loadDotEnvFiles(paths: string[]) {
    if (paths.length === 0) {
      console.log("No dotEnv paths provided");
      return;
    }
    console.log("Importing custom dotEnv filepaths");
    config({ path: paths });
  }

  validate() {
    const schema = this.#config.schema;
    const processEnv = process.env;
    const res = schema.safeParse(processEnv);
    if (!res.success) {
      throw new Error(`Invalid configuration format:
    ${z.prettifyError(res.error)}`);
    }
    return res.data as T;
  }

  getAllEnvVars() {
    return this.validate();
  }

  getEnvVar(key: keyof T) {
    const vars = this.getAllEnvVars();
    return vars[key];
  }
}

export async function createSupermenv<T extends Record<string, unknown>>({
  rootDir,
}: {
  rootDir: string;
}) {
  const dotDir = new DotDir<SupermenvConfig>();
  const res = await dotDir.find({
    dirName: "supermenv",
    cwd: rootDir,
  });
  if (!res || !res.config) {
    throw new Error("Missing .supermenv config");
  }
  const validated = SupermenvConfigSchema.safeParse(res.config);
  if (!validated.success) {
    throw new Error(`Invalid configuration format:
    ${z.prettifyError(validated.error)}`);
  }
  return new Supermenv<T>(res);
}
