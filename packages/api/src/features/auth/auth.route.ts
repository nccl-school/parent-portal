import { Hono } from "hono";

import { auth } from "../../auth.js";

export const authentication = new Hono();

authentication.on(["POST", "GET"], "*", (c) => {
  return auth.handler(c.req.raw);
});
