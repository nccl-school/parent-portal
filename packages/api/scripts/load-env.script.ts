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

    case "test:host":
      dotenv.config({
        path: [
          path.resolve(import.meta.dirname, "../../../.env.spec"),
          path.resolve(import.meta.dirname, "../../../.env"),
        ],
      });
      process.env.DATABASE_URL = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
      break;

    case "production":
    case "development":
      dotenv.config({
        path: path.resolve(import.meta.dirname, "../../../.env"),
      });
      break;

    default:
      throw new Error("NODE_ENV is not set");
  }
}
