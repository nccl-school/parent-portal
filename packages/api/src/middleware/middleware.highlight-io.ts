import { highlightMiddleware } from "@highlight-run/hono";
import { ENV } from "@nccl/env";
import { createMiddleware } from "hono/factory";

export const highlightIOMiddleware = createMiddleware(async (_c, next) => {
  highlightMiddleware({ projectID: ENV.getEnvVar("HIGHLIGHT_PROJECT_ID") });
  await next();
});
