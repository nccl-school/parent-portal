import type { z } from "supermenv";
import { createSupermenv } from "supermenv";

import type { ENV_SCHEMA } from "./schema.js";

export type NCCLEnv = z.infer<typeof ENV_SCHEMA>;

export const ENV = await createSupermenv<NCCLEnv>({
  rootDir: import.meta.dirname,
});
