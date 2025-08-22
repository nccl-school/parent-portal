import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { cors } from "hono/cors";

import { prismaMiddleware } from "./middleware/middleware.prisma.js";
import { sessionMiddleware } from "./middleware/middleware.session.js";
import { suggestion } from "./features/suggestion/suggestion.route.js";
import { user } from "./features/user/user.route.js";
import { serializeError } from "./utils/util.errors.js";
import { role } from "./features/role/role.route.js";
import { authentication } from "./features/auth/auth.route.js";
import { resource } from "./features/resource/resource.route.js";
import { emailMiddleware } from "./middleware/middleware.email.js";
import { account } from "./features/account/account.route.js";
import { directory } from "./features/directory/directory.route.js";
import { health } from "./features/health/health.route.js";

const app = new Hono();

// Middleware - CORS, logging, transactional email
app.use(logger());
app.use(emailMiddleware);
app.use(prismaMiddleware);
app.use(
  cors({
    origin: "*", // or specific domains: ["https://yourapp.com"]
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["*"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Health check
app.route("/health", health);

// Authentication routes
app.route("/api/auth", authentication);
app.route("/api/account", account);

// Session aware routes
app.use(sessionMiddleware);
app.route("/api/suggestion", suggestion);
app.route("/api/role", role);
app.route("/api/user", user);
app.route("/api/resource", resource);
app.route("/api/directory", directory);

// Errors
app.onError((error, c) => {
  const errorPayload = serializeError(error);
  return c.json(errorPayload, errorPayload.status as ContentfulStatusCode);
});

serve(
  {
    fetch: app.fetch,
    port: 8080,
    hostname: "0.0.0.0",
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
