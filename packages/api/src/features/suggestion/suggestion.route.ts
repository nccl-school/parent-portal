import { Hono } from "hono";
import { describeRoute } from "hono-openapi";

import { ErrorSet } from "#errors";
import { validate } from "#middleware/middleware.validate.js";

import {
  CreateSuggestionRequestSchema,
  GetSuggestionParamsSchema,
} from "./suggestion.utils.js";

export const suggestion = new Hono();

// Get all suggestions
suggestion.get(
  "/",
  describeRoute({
    summary: "Get list of suggestions", // short title used in Postman
    description: "Get a list of the suggestions",
  }),
  async (c) => {
    const db = c.get("db");
    const suggestions = await db.suggestion.findMany();
    return c.json(suggestions);
  }
);

// Create a suggestion
suggestion.post(
  "/",
  describeRoute({
    summary: "Create a suggestion",
    description: "Create a suggestion",
    validateResponse: true,
  }),
  validate("json", CreateSuggestionRequestSchema),
  async (c) => {
    const json = c.req.valid("json");
    const newSuggestion = await c.var.db.suggestion.create({
      data: {
        ...json,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return c.json(newSuggestion);
  }
);

// Get a suggestion by ID
suggestion.get(
  "/:id",
  describeRoute({
    summary: "Get a suggestion by ID",
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
