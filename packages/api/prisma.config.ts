import path from "node:path";

import type { PrismaConfig } from "prisma";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") });

export default {
  earlyAccess: true,
  // now you can use process.env variables
} satisfies PrismaConfig;
