import type { DotDirResponse } from "dotdir";
import { DotDir } from "dotdir";
import z from "zod";
import { config } from "dotenv";

import { SupermenvConfigSchema, type SupermenvConfig } from "./config.js";

class Supermenv<C extends SupermenvConfig> {
  //   #configMeta: DotDirResponse<C>["meta"];
  #config: DotDirResponse<C>["config"];

  constructor(supermenvConfig: C) {
    // this.#configMeta = dotDir.meta;
    this.#config = supermenvConfig;
    if (this.#config.dotEnvFilePaths) {
      console.log("Importing custom dotEnv filepaths");
      config({ path: this.#config.dotEnvFilePaths });
    }
  }

  validate() {
    const schema = this.#config.schema;
    const processEnv = process.env;
    const res = schema.safeParse(processEnv);
    if (!res.success) {
      throw new Error(`Invalid configuration format:
    ${z.prettifyError(res.error)}`);
    }
    return res.data as z.infer<C["schema"]>;
  }
}

export async function createSupermenv() {
  const dotDir = new DotDir();
  const res = await dotDir.find({ dirName: "supermenv" });
  if (!res || !res.config) {
    throw new Error("Missing .supermenv config");
  }
  const validated = SupermenvConfigSchema.safeParse(res.config);
  if (!validated.success) {
    throw new Error(`Invalid configuration format:
    ${z.prettifyError(validated.error)}`);
  }
  return new Supermenv(validated.data);
}
