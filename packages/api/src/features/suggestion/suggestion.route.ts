import { Hono } from "hono";

export const suggestion = new Hono();

// Get all suggestions
suggestion.get("/", (c) => {
  return c.json({ message: "hello suggestion!" });
});
