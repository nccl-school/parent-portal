import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";

import {
  GetSuggestionApiParamsSchema,
  GetSuggestionApiResponseSchema,
} from "./suggestion.utils.js";

import { ServerError } from "../../utils/util.handleError.js";
import { validate } from "../../middleware/middleware.validate.js";

export const getSuggestion = new Hono();

getSuggestion.get(
  "/",
  describeRoute({
    description: "Get one suggestion by ID",
    validateResponse: true,
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: resolver(GetSuggestionApiResponseSchema),
          },
        },
      },
    },
  }),
  validate("param", GetSuggestionApiParamsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const suggestion = await c.var.db.suggestion.findFirst({
      where: { id },
    });
    if (!suggestion) {
      throw new ServerError.notFound();
    }
    return c.json({ suggestion });
  }
);
