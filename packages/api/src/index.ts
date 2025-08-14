import path from "path";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import dotenv from "dotenv";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { cors } from "hono/cors";

import { prismaMiddleware } from "./middleware/middleware.prisma.js";
import { sessionMiddleware } from "./middleware/middleware.session.js";
import { highlightIOMiddleware } from "./middleware/middleware.highlight-io.js";
import { suggestion } from "./features/suggestion/suggestion.route.js";
import { user } from "./features/user/user.route.js";
import { serializeError } from "./utils/util.errors.js";
import { role } from "./features/role/role.route.js";
import { authentication } from "./features/auth/auth.route.js";
import { resource } from "./features/resource/resource.route.js";

// Environment Vars
const envPath = path.resolve(import.meta.dirname, "../../../.env");
dotenv.config({ path: envPath });

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*", // or specific domains: ["https://yourapp.com"]
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["*"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);
app.use(logger());
app.route("/api/auth", authentication);

// Middleware - Authenticate and add the current user to the context
app.use("/api/*", sessionMiddleware);

app.use("/api/*", prismaMiddleware);
app.use(highlightIOMiddleware);

// Authenticated routes
app.route("/api/suggestion", suggestion);
app.route("/api/role", role);
app.route("/api/user", user);
app.route("/api/resource", resource);

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
