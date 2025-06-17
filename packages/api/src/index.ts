import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";

// Routes
import { suggestion } from "./features/suggestion/suggestion.route.js";
import { createOpenAPISpecs } from "./features/openapi/openapi.route.js";
import { handleError } from "./utils/index.js";

const app = new Hono().basePath("/api");

// Middleware
app.use(logger());

// Routes
app.route("/suggestion", suggestion);

// Errors
app.onError((error, c) => {
  const errorPayload = handleError(error);
  return c.json(errorPayload, errorPayload.status);
});

// Docs
app.get("/openapi", createOpenAPISpecs(app));

serve(
  {
    fetch: app.fetch,
    port: 9000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
