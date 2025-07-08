import { Hono } from "hono";

import {
  CreateSuggestionReactionParams,
  CreateSuggestionReactionRequest,
  CreateSuggestionRequestSchema,
  CreateSuggestionResponseSchema,
  GetSuggestionListResponseSchema,
  GetSuggestionParamsSchema,
  GetSuggestionReactionsPerUserSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionParamsSchema,
  UpdateSuggestionRequestSchema,
  type GetSuggestionListResponse,
} from "./suggestion.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { serialize } from "../../utils/util.serialize.js";
import { exhaustiveMatchGuard } from "../../utils/util.exhaustiveMatchGuard.js";

export const suggestion = new Hono();

// GET / api/suggestion | Get a list of suggestions
suggestion.get("/", async (c) => {
  const db = c.get("db");
  const suggestions = await db.suggestion.findMany({
    include: {
      reactions: true,
    },
  });

  const json: GetSuggestionListResponse = suggestions.map((suggestion) => {
    const counts = { likes: 0, dislikes: 0, comments: 0 };
    for (const r of suggestion.reactions) {
      if (r.type === "LIKE") counts.likes++;
      else if (r.type === "DISLIKE") counts.dislikes++;
      else if (r.type === "COMMENT") counts.comments++;
    }

    return {
      counts,
      ...suggestion,
    };
  });

  const data = await serialize(GetSuggestionListResponseSchema, json);
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
    const suggestion = await db.suggestion.findUnique({
      where: { id },
      include: {
        createdBy: {
          include: {
            role: {},
          },
        },
      },
    });
    if (!suggestion) {
      throw new ErrorSet.notFound();
    }
    console.log(suggestion);
    const data = await serialize(GetSuggestionResponseSchema, suggestion);
    return c.json(data);
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

// GET /api/suggestion/:id/reactions | Get the reactions for a specific suggestion
// TODO: Add serializer
suggestion.get(
  "/:id/reactions",
  validate("param", GetSuggestionParamsSchema),
  async (c) => {
    const params = c.req.valid("param");
    const db = c.get("db");

    const comments = await db.suggestionReactions.findMany({
      where: {
        suggestionId: params.id,
      },
    });
    return c.json(comments);
  }
);

// GET /api/suggestion/:id/reactions/:user_id | Get a suggestion's reactions by user
// TODO: Add serializer
suggestion.get(
  "/:id/reactions/:user_id",
  validate("param", GetSuggestionReactionsPerUserSchema),
  async (c) => {
    const params = c.req.valid("param");
    const db = c.get("db");

    const comments = await db.suggestionReactions.findMany({
      where: {
        suggestionId: params.id,
        createdById: params.user_id,
      },
      include: {
        suggestion: {
          select: {
            id: true,
          },
        },
        createdBy: {
          select: {
            id: true,
          },
        },
      },
    });
    return c.json(comments);
  }
);

// POST /api/suggestion/:id/like | Like a suggestion
// TODO: Add serializer
// TODO: Validate body
suggestion.post(
  "/:id/react",
  validate("param", CreateSuggestionReactionParams),
  validate("json", CreateSuggestionReactionRequest),
  async (c) => {
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    const db = c.get("db");
    const currentUser = c.get("currentUser");

    switch (body.type) {
      case "LIKE":
      case "DISLIKE": {
        const record = await db.suggestionReactions.findUnique({
          where: {
            createdById_suggestionId_type: {
              createdById: currentUser.id,
              suggestionId: params.id,
              type: body.type,
            },
          },
        });
        if (record) {
          await db.suggestionReactions.delete({ where: { id: record.id } });
        } else {
          await db.suggestionReactions.create({
            data: {
              type: body.type,
              suggestionId: params.id,
              createdById: currentUser.id,
            },
          });
        }
        break;
      }

      case "COMMENT":
        break;
      default:
        exhaustiveMatchGuard(body);
    }

    return c.json(null, 203);
  }
);

suggestion.all(() => {
  throw new ErrorSet.notFound();
});
