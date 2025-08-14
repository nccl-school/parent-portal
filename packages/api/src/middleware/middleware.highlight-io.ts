import { highlightMiddleware } from "@highlight-run/hono";
import { createMiddleware } from "hono/factory";

import { getEnvVar } from "../utils/util.envVar.js";

export const highlightIoMiddleware = createMiddleware(async (c, next) => {
  const { HIGHLIGHT_PROJECT_ID } = getEnvVar(c);
  highlightMiddleware({ projectID: HIGHLIGHT_PROJECT_ID });
  await next();
});
