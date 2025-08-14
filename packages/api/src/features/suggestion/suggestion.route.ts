import { Hono } from "hono";
import type { z } from "zod/v4";

import {
  SuggestionIDParamsSchema,
  CreateSuggestionVoteRequest,
  CreateSuggestionRequestSchema,
  CreateSuggestionResponseSchema,
  GetSuggestionListResponseSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionRequestSchema,
  GetSuggestionListQuerySchema,
  CreateSuggestionVoteResponseSchema,
  GetSuggestionCommentsResponseSchema,
  CreateSuggestionCommentsRequestSchema,
  CreateSuggestionCommentsResponseSchema,
  UpdateSuggestionResponseSchema,
  CommentIDParamsSchema,
  DeleteSuggestionCommentResponseSchema,
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
        _count: {
          select: {
            comments: true,
          },
        },
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
      .map(({ _count: { comments }, ...restSuggestion }) => {
        const counts = { likes: 0, dislikes: 0, comments };
        for (const r of restSuggestion.votes) {
          if (r.type === "LIKE") counts.likes++;
          else if (r.type === "DISLIKE") counts.dislikes++;
        }

        return {
          counts: {
            ...counts,
            total: counts.likes - counts.dislikes,
          },
          current_user_vote:
            CurrentUserVotesBySuggestion.get(restSuggestion.id) ?? null,
          ...restSuggestion,
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
  validate("param", SuggestionIDParamsSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");
    const suggestion = await db.suggestion.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
        createdBy: {
          include: {
            role: true,
          },
        },
      },
    });
    if (!suggestion) {
      throw new ErrorSet.notFound();
    }
    const { _count, ...restSuggestion } = suggestion;
    const data = await serialize(GetSuggestionResponseSchema, {
      ...restSuggestion,
      numOfComments: _count.comments,
    });
    return c.json(data);
  }
);

// PUT /api/suggestion/:id | Update a suggestion
suggestion.put(
  "/:id",
  validate("param", SuggestionIDParamsSchema),
  validate("json", UpdateSuggestionRequestSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const db = c.get("db");
    const body = c.req.valid("json");
    const suggestion = await db.suggestion.update({
      where: { id },
      data: body,
      include: {
        createdBy: {
          include: {
            role: true,
          },
        },
      },
    });
    const data = await serialize(UpdateSuggestionResponseSchema, suggestion);
    return c.json(data);
  }
);

// POST /api/suggestion/:id/vote | Vote on a suggestion
suggestion.post(
  "/:id/vote",
  validate("param", SuggestionIDParamsSchema),
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
      const data = await serialize(CreateSuggestionVoteResponseSchema, {
        message: `Successfully removed vote for suggestion ${params.id}`,
      });
      return c.json(data);
    }
    // record exists, but the submission is different so we update
    if (record) {
      await db.suggestionVote.update({
        where: { id: record.id },
        data: { type: body.type },
      });
      const data = await serialize(CreateSuggestionVoteResponseSchema, {
        message: `Successfully changed vote from ${record.type} to ${body.type} for suggestion ${params.id}`,
      });
      return c.json(data);
    }
    // no record so we create one
    await db.suggestionVote.create({
      data: {
        type: body.type,
        suggestionId: params.id,
        createdById: currentUser.id,
      },
    });
    const data = await serialize(CreateSuggestionVoteResponseSchema, {
      message: `Successfully voted ${body.type} for suggestion ${params.id}`,
    });
    return c.json(data);
  }
);

// GET /api/suggestion/:id/comment | Get's all of the comments on a suggestion
suggestion.get(
  "/:id/comment",
  validate("param", SuggestionIDParamsSchema),
  async (c) => {
    const params = c.req.valid("param");
    const db = c.get("db");
    const records = await db.suggestionComment.findMany({
      where: {
        suggestionId: params.id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            authId: true,
            imageUrl: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const data = await serialize(GetSuggestionCommentsResponseSchema, records);
    return c.json(data);
  }
);

// POST /api/suggestion/:id/comment | Creates a comment on a suggestion
suggestion.post(
  "/:id/comment",
  validate("param", SuggestionIDParamsSchema),
  validate("json", CreateSuggestionCommentsRequestSchema),
  async (c) => {
    const params = c.req.valid("param");
    const body = c.req.valid("json");
    const user = c.get("currentUser");
    const db = c.get("db");
    const record = await db.suggestionComment.create({
      data: {
        comment: body.comment,
        isAnonymous: body.isAnonymous,
        createdById: user.id,
        suggestionId: params.id,
      },
    });
    const data = await serialize(
      CreateSuggestionCommentsResponseSchema,
      record
    );
    return c.json(data);
  }
);

// DELETE /api/suggestion/:id/comment | Deletes a comment
suggestion.delete(
  "/comment/:id",
  validate("param", CommentIDParamsSchema),
  async (c) => {
    const params = c.req.valid("param");
    const currentUser = c.get("currentUser");
    const db = c.get("db");

    const record = await db.suggestionComment.findUnique({
      where: {
        id: params.id,
      },
    });

    // Throw a 404 if the comment isn't there
    if (!record) {
      throw new ErrorSet.notFound("The requested comment cannot be found");
    }

    // Unless the user is an admin, they cannot delete someone
    // elses comment
    if (
      currentUser.id !== record.createdById &&
      currentUser.roleId !== "ADMIN"
    ) {
      throw new ErrorSet.notFound(
        "You are not authorized to delete this comment."
      );
    }

    await db.suggestionComment.delete({
      where: {
        id: params.id,
      },
    });

    const data = await serialize(DeleteSuggestionCommentResponseSchema, {
      message: "Successfully deleted comment",
    });
    return c.json(data);
  }
);

suggestion.all(() => {
  throw new ErrorSet.notFound();
});
