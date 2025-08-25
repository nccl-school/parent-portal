import { Hono } from "hono";

import { auth as betterAuth } from "../../auth.js";

export const auth = new Hono();

// const res = await betterAuth.api.signOut({

// })
auth.get("/session", async (c) => {
  const session = await betterAuth.api.getSession(c.req.raw);
  return c.json(session ?? { session: null, user: null });
});

auth.all("*", async (c) => {
  return await betterAuth.handler(c.req.raw);
});
