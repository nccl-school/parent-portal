import type { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

export function createOpenAPISpecs<T extends Hono>(app: T) {
  return openAPISpecs(app, {
    documentation: {
      info: {
        title: "Hono API",
        version: "1.0.0",
        description: "Greeting API",
      },
      servers: [{ url: "http://localhost:3000", description: "Local Server" }],
    },
  });
}
