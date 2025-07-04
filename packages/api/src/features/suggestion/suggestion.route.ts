import { Hono } from "hono";

import {
  CreateSuggestionRequestSchema,
  GetSuggestionListResponseSchema,
  GetSuggestionParamsSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionParamsSchema,
  UpdateSuggestionRequestSchema,
} from "./suggestion.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { serialize } from "../../utils/util.serialize.js";

export const suggestion = new Hono();

// Get all suggestions
suggestion.get("/", async (c) => {
  const db = c.get("db");
  const suggestions = await db.suggestion.findMany();
  const data = await serialize(GetSuggestionListResponseSchema, suggestions);
  return c.json(data);
});

// Create a suggestion
suggestion.post(
  "/",
  validate("json", CreateSuggestionRequestSchema),
  async (c) => {
    const body = c.req.valid("json");
    const currentUser = c.get("currentUser");
    const db = c.get("db");

    const newSuggestion = await db.suggestion.create({
      data: {
        ...body,
        status: "DRAFT",
        createdBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    const data = await serialize(GetSuggestionResponseSchema, newSuggestion);
    return c.json(data);
  }
);

// Get a suggestion by ID
suggestion.get(
  "/:id",
  validate("param", GetSuggestionParamsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");
    const suggestion = await db.suggestion.findFirst({
      where: { id },
    });
    if (!suggestion) {
      throw new ErrorSet.notFound();
    }
    const data = await serialize(GetSuggestionResponseSchema, suggestion);
    return c.json(data);
  }
);

// Update a suggestion
suggestion.put(
  "/:id",
  validate("param", UpdateSuggestionParamsSchema),
  validate("json", UpdateSuggestionRequestSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");
    const body = c.req.valid("json");
    const suggestion = await db.suggestion.update({
      where: { id },
      data: body,
    });
    const data = serialize(GetSuggestionResponseSchema, suggestion);
    return c.json(data);
  }
);
