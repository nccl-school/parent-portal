import { createSupermenv } from "supermenv";

import type { NCCLEnv } from "./.supermenv/config.js";

const Supermenv = await createSupermenv();

export function validateEnvVars() {
  return Supermenv.validate();
}

export function getEnvVar(key: keyof NCCLEnv) {
  const vars = validateEnvVars();
  return vars[key];
}
