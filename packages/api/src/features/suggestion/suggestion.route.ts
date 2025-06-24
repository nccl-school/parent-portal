import { Hono } from "hono";
import { describeRoute } from "hono-openapi";

import { ErrorSet } from "#errors";
import { serialize } from "#utils";
import { validate } from "#middleware/middleware.validate.js";

import {
  CreateSuggestionRequestSchema,
  GetSuggestionListResponseSchema,
  GetSuggestionParamsSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionParamsSchema,
  UpdateSuggestionRequestSchema,
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
    const data = serialize(GetSuggestionListResponseSchema, suggestions);
    return c.json(data);
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
    const body = c.req.valid("json");
    const newSuggestion = await c.var.db.suggestion.create({
      data: body,
    });
    const data = serialize(GetSuggestionResponseSchema, newSuggestion);
    return c.json(data);
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
    const data = serialize(GetSuggestionResponseSchema, suggestion);
    return c.json(data);
  }
);

// Update a suggestion
suggestion.put(
  "/:id",
  describeRoute({
    summary: "Update a suggestion",
    description: "Update a suggestion",
    validateResponse: true,
  }),
  validate("param", UpdateSuggestionParamsSchema),
  validate("json", UpdateSuggestionRequestSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const suggestion = await c.var.db.suggestion.update({
      where: { id },
      data: body,
    });
    const data = serialize(GetSuggestionResponseSchema, suggestion);
    return c.json(data);
  }
);
