import path from "path";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import dotenv from "dotenv";
import { clerkMiddleware } from "@hono/clerk-auth";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import { prismaMiddleware } from "./middleware/middleware.prisma.js";
import { currentUserMiddleware } from "./middleware/middleware.current-user.js";
import { createOpenAPISpecs } from "./features/openapi/openapi.route.js";
import { suggestion } from "./features/suggestion/suggestion.route.js";
import { user } from "./features/user/user.route.js";
import { serializeError } from "./utils/util.errors.js";
import { webhooks } from "./features/webhooks/webhooks.route.js";

// Environment Vars
dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });

const app = new Hono();

// OpenAPI Docs
app.get("/openapi", createOpenAPISpecs(app));

// Middleware
app.use(logger());
app.use("/api/*", prismaMiddleware);

// Webhooks
app.route("/api/webhooks", webhooks);

// Middleware
app.use("/api/*", clerkMiddleware());
app.use("/api/*", currentUserMiddleware);

// Routes
app.route("/api/suggestion", suggestion);
app.route("/api/user", user);

// Errors
app.onError((error, c) => {
  const errorPayload = serializeError(error);
  return c.json(errorPayload, errorPayload.status as ContentfulStatusCode);
});

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
