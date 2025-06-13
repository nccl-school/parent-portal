import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";

type EnvVars = {
  // run time
  CLERK_SECRET_KEY: string;
  GOOGLE_CALENDAR_API_KEY: string;
  GOOGLE_CALENDAR_ID_NCCL_PUBLIC: string;
  NCCL_APP_URL: string;
  CLERK_PUBLISHABLE_KEY: string;
};

declare module "react-router" {
  interface AppLoadContext {
    env: EnvVars;
  }
}

function envVar(key: keyof EnvVars) {
  return process.env[key] ?? "NO_KEY_DEFINED";
}

export const app = express();

app.use(
  createRequestHandler({
    // eslint-disable-next-line import/no-unresolved
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        env: {
          NCCL_APP_URL: envVar("NCCL_APP_URL"),
          CLERK_SECRET_KEY: envVar("CLERK_SECRET_KEY"),
          CLERK_PUBLISHABLE_KEY: envVar("CLERK_PUBLISHABLE_KEY"),
          GOOGLE_CALENDAR_API_KEY: envVar("GOOGLE_CALENDAR_API_KEY"),
          GOOGLE_CALENDAR_ID_NCCL_PUBLIC: envVar(
            "GOOGLE_CALENDAR_ID_NCCL_PUBLIC"
          ),
        },
      };
    },
  })
);
