import { Hono } from "hono";

import { ErrorSet } from "../../client.js";

export const health = new Hono();

health.get("/", (c) =>
  c.text("https://www.youtube.com/watch?v=W16qzZ7J5YQ", 200)
);

health.get("/ready", async (c) => {
  const db = c.get("db");
  try {
    // Run a lightweight query
    await db.$queryRaw`SELECT 1`;
    return c.json({ status: "ok", db: true });
  } catch (err) {
    console.error(err);
    throw new ErrorSet.serverError("Readiness check failed");
  }
});
