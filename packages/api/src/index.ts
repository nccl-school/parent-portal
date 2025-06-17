import { serve } from "@hono/node-server";
import { Hono } from "hono";

// Routes
import { suggestion } from "./features/suggestion/suggestion.route.js";
import { createOpenAPISpecs } from "./features/openapi/openapi.route.js";

const app = new Hono().basePath("/api");

app.route("/suggestion", suggestion);
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
