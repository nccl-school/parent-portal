import path from "node:path";

import dotenv from "dotenv";

export function loadEnv() {
  console.log(
    `Loading environment variables for NODE_ENV=${process.env.NODE_ENV}`
  );
  switch (process.env.NODE_ENV) {
    case "test":
      dotenv.config({
        path: [
          path.resolve(import.meta.dirname, "../../../.env.spec"),
          path.resolve(import.meta.dirname, "../../../.env"),
        ],
      });
      break;

    default:
      dotenv.config({
        path: path.resolve(import.meta.dirname, "../../../.env"),
      });
      break;
  }
}
