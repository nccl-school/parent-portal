import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import z from "zod";

const messageSchema = z.object({ message: z.string() });

export const getOne = new Hono();

// Get all suggestions
getOne.get(
  "/",
  describeRoute({
    description: "Get one suggestion by ID",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": { schema: resolver(messageSchema) },
        },
      },
    },
  }),
  (c) => {
    return c.json({ message: "hello suggestion!" });
  }
);
