import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import z from "zod";

const messageSchema = z.object({ message: z.string() });

export const getMany = new Hono();

// Get all suggestions
getMany.get(
  "/",
  describeRoute({
    description: "Get a list of the suggestions",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": { schema: resolver(messageSchema) },
        },
      },
    },
  }),
  async (c) => {
    const db = c.get("db");
    const suggestions = await db.suggestion.findMany();
    return c.json(suggestions);
  }
);
