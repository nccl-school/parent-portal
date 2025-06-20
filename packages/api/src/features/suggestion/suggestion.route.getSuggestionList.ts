import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";

import { GetSuggestionResponseSchema } from "./suggestion.utils.js";

export const getSuggestionList = new Hono();

// Get all suggestions
getSuggestionList.get(
  "/",
  describeRoute({
    description: "Get a list of the suggestions",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: resolver(GetSuggestionResponseSchema),
          },
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
