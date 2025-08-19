import path from "node:path";

import { z, type SupermenvConfig } from "supermenv";

export default {
  schema: z.object({
    NCCL_API_URL: z.url(),
  }),
  dotEnvFilePaths: [path.resolve(import.meta.dirname, "../../../.env")],
} satisfies SupermenvConfig;
