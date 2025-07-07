import { Hono } from "hono";

import {
  CreateSuggestionRequestSchema,
  CreateSuggestionResponseSchema,
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

// GET / api/suggestion | Get a list of suggestions
suggestion.get("/", async (c) => {
  const db = c.get("db");
  const suggestions = await db.suggestion.findMany({
    include: {
      _count: {
        select: { comments: true },
      },
    },
  });
  console.log(suggestions);
  const data = await serialize(GetSuggestionListResponseSchema, suggestions);
  return c.json(data);
});

// POST /api/suggestion | Create a suggestion
suggestion.post(
  "/",
  validate("json", CreateSuggestionRequestSchema),
  async (c) => {
    const body = c.req.valid("json");
    const currentUser = c.get("currentUser");
    const db = c.get("db");

    console.log("Creating a new suggestion");
    const newSuggestion = await db.suggestion.create({
      data: {
        ...body,
        status: "DISCUSSION",
        createdBy: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        createdBy: {
          include: {
            role: {},
          },
        },
      },
    });
    const data = await serialize(CreateSuggestionResponseSchema, newSuggestion);
    return c.json(data);
  }
);

// GET /api/suggestion/:id | Get a suggestion
suggestion.get(
  "/:id",
  validate("param", GetSuggestionParamsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");
    const suggestion = await db.suggestion.findFirst({
      where: { id },
      include: {
        createdBy: {},
      },
    });
    if (!suggestion) {
      throw new ErrorSet.notFound();
    }
    const data = await serialize(GetSuggestionResponseSchema, suggestion);
    return c.json(data);
  }
);

// GET /api/suggestion/:id/comments | Get a suggestion's comments
suggestion.get(
  "/:id/comments",
  validate("param", GetSuggestionParamsSchema),
  async (c) => {
    const params = c.req.valid("param");
    const db = c.get("db");

    const comments = await db.suggestionComments.findMany({
      where: {
        suggestionId: params.id,
      },
    });
    return c.json(comments);
  }
);

// PUT /api/suggestion/:id | Update a suggestion
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

suggestion.all(() => {
  throw new ErrorSet.notFound();
});
