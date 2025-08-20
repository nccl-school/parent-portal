import "react-router";

import { createRequestHandler } from "@react-router/express";
import express from "express";
import { ENV } from "@nccl/env";

ENV.load();

declare module "react-router" {
  interface AppLoadContext {
    env: ReturnType<typeof ENV.getAll>;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    // eslint-disable-next-line import/no-unresolved
    build: () => import("virtual:react-router/server-build"),
    getLoadContext() {
      return {
        env: ENV.getAll(),
      };
    },
  })
);
