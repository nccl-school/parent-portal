import { serve } from "@hono/node-server";

import app from "./server.js";

serve(
  {
    fetch: app.fetch,
    port: 7001,
  },
  (info) => {
    console.log(`Hono server running at http://localhost:${info.port}`);
  }
);
