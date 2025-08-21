import { createMiddleware } from "hono/factory";

export const highlightIOMiddleware = createMiddleware(async (_c, next) => {
  // highlightMiddleware({ projectID: ENV.getOne("HIGHLIGHT_PROJECT_ID") });
  await next();
});
