import path from "path";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import dotenv from "dotenv";
import { clerkMiddleware } from "@hono/clerk-auth";

import { suggestion } from "./features/suggestion/suggestion.route.js";
import { createOpenAPISpecs } from "./features/openapi/openapi.route.js";
import { user } from "./features/user/user.route.js";
import { handleError } from "./utils/index.js";
import { prismaMiddleware } from "./middleware/middleware.prisma.js";
import { currentUserMiddleware } from "./middleware/middleware.current-user.js";

// Environment Vars
dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });

const app = new Hono().basePath("/api");

// Middleware
app.use(logger());
app.use("*", clerkMiddleware());
app.use("*", currentUserMiddleware);
app.use("*", prismaMiddleware);

// Routes
app.route("/suggestion", suggestion);
app.route("/user", user);
app.get("/openapi", createOpenAPISpecs(app));

// Errors
app.onError((error, c) => {
  const errorPayload = handleError(error);
  return c.json(errorPayload, errorPayload.status);
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
