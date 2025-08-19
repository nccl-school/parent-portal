import path from "node:path";

import { z, type SupermenvConfig } from "supermenv";

export type NCCLEnv = z.infer<(typeof config)["schema"]>;

const config = {
  dotEnvFilePaths: [path.resolve(import.meta.dirname, "../../../../.env")],
  schema: z.object({
    NCCL_API_URL: z.url(),
  }),
} satisfies SupermenvConfig;

export default config;
