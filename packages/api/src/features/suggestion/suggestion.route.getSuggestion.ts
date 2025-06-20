import { Hono } from "hono";
import { describeRoute } from "hono-openapi";

import { GetSuggestionParamsSchema } from "./suggestion.utils.js";

import { ErrorSet } from "../../utils/util.errors.js";
import { validate } from "../../middleware/middleware.validate.js";

export const getSuggestion = new Hono();

getSuggestion.get(
  "/",
  describeRoute({
    description: "Get one suggestion by ID",
    validateResponse: true,
  }),
  validate("param", GetSuggestionParamsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const suggestion = await c.var.db.suggestion.findFirst({
      where: { id },
    });
    if (!suggestion) {
      throw new ErrorSet.notFound();
    }
    return c.json({ suggestion });
  }
);
