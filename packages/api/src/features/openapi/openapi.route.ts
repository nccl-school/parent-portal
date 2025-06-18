import type { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

export function createOpenAPISpecs<T extends Hono>(app: T) {
  return openAPISpecs(app, {
    documentation: {
      info: {
        title: "NCCL Parent Portal API",
        version: "1.0.0",
        description:
          "The API that supplies backend functionality to all NCCL Parent apps",
      },
      servers: [{ url: "http://localhost:8080", description: "LOCAL" }],
    },
  });
}
