import { Hono } from "hono";
import type { z } from "zod/v4";

import {
  CreateSuggestionVoteParams,
  CreateSuggestionVoteRequest,
  CreateSuggestionRequestSchema,
  CreateSuggestionResponseSchema,
  GetSuggestionListResponseSchema,
  GetSuggestionParamsSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionParamsSchema,
  UpdateSuggestionRequestSchema,
  GetSuggestionListQuerySchema,
} from "./suggestion.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";
import { serialize } from "../../utils/util.serialize.js";

export const suggestion = new Hono();

// GET / api/suggestion | Get a list of suggestions, their votes and comment counts
suggestion.get(
  "/",
  validate("query", GetSuggestionListQuerySchema),
  async (c) => {
    const db = c.get("db");
    const query = c.req.valid("query");
    const currentUser = c.get("currentUser");

    const suggestions = await db.suggestion.findMany({
      ...(query.search
        ? {
            where: {
              OR: [
                {
                  title: {
                    search: `'${query.search}'`,
                  },
                },
                {
                  description: {
                    search: `'${query.search}'`,
                  },
                },
              ],
            },
          }
        : {}),
      include: {
        votes: {
          select: {
            type: true,
          },
        },
      },
    });

    const currentUserSuggestionVotes = await db.suggestionVote.findMany({
      where: {
        createdById: currentUser.id,
      },
    });
    const CurrentUserVotesBySuggestion = new Map();
    for (const vote of currentUserSuggestionVotes) {
      CurrentUserVotesBySuggestion.set(vote.suggestionId, vote.type);
    }

    const json: z.infer<typeof GetSuggestionListResponseSchema> = suggestions
      .map((suggestion) => {
        const counts = { likes: 0, dislikes: 0, comments: 0 };
        for (const r of suggestion.votes) {
          if (r.type === "LIKE") counts.likes++;
          else if (r.type === "DISLIKE") counts.dislikes++;
        }

        return {
          counts: {
            ...counts,
            total: counts.likes - counts.dislikes,
          },
          current_user_vote:
            CurrentUserVotesBySuggestion.get(suggestion.id) ?? null,
          ...suggestion,
        };
      })
      .sort((a, b) => b.counts.total - a.counts.total);

    const data = await serialize(GetSuggestionListResponseSchema, json);
    return c.json(data);
  }
);

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

// POST /api/suggestion/:id/vote | Vote on a suggestion
suggestion.post(
  "/:id/vote",
  validate("param", CreateSuggestionVoteParams),
  validate("json", CreateSuggestionVoteRequest),
  async (c) => {
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    const db = c.get("db");
    const currentUser = c.get("currentUser");

    const record = await db.suggestionVote.findUnique({
      where: {
        createdById_suggestionId: {
          createdById: currentUser.id,
          suggestionId: params.id,
        },
      },
    });
    // record exists, but the submission was the same so we toggle
    if (record && record.type === body.type) {
      await db.suggestionVote.delete({ where: { id: record.id } });
      return c.body(null, 204);
    }
    // record exists, but the submission is different so we update
    if (record) {
      await db.suggestionVote.update({
        where: { id: record.id },
        data: { type: body.type },
      });
      return c.body(null, 204);
    }
    // no record so we create one
    await db.suggestionVote.create({
      data: {
        type: body.type,
        suggestionId: params.id,
        createdById: currentUser.id,
      },
    });
    return c.body(null, 204);
  }
);

suggestion.all(() => {
  throw new ErrorSet.notFound();
});
