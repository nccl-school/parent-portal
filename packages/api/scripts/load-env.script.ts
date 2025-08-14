import path from "node:path";

import dotenv from "dotenv";

export function loadEnv() {
  switch (process.env.NODE_ENV) {
    case "test":
      dotenv.config({
        path: [path.resolve(import.meta.dirname, "../../../.env.spec")],
      });
      break;

    case "test:host":
      dotenv.config({
        path: [
          path.resolve(import.meta.dirname, "../../../.env.spec"),
          path.resolve(import.meta.dirname, "../../../.env"),
        ],
      });
      process.env.DATABASE_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
      break;

    default:
      dotenv.config({
        path: path.resolve(import.meta.dirname, "../../../.env"),
      });
  }
  console.log(
    `Loading environment variables for NODE_ENV=${process.env.NODE_ENV}`
  );
}
