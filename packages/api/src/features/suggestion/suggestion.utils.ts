import z from "zod";

import {
  createQuerySchema,
  zCleanStringSchema,
  zDateStringSchema,
  zMessageSchema,
  zQueryParam,
  zStringRequired,
} from "../../utils/util.schema.js";
import { UserSchema } from "../user/user.utils.js";

export const SuggestionCommentSchema = z.object({
  id: z.string(),
  comment: zStringRequired("A comment is required"),
  isAnonymous: z.boolean().optional().default(false),
  createdBy: UserSchema,
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});

// Base Type
export const SuggestionSchema = z.object({
  id: z.string(),
  title: zCleanStringSchema,
  description: zCleanStringSchema,
  status: z.literal(["DISCUSSION", "PLANNED", "IN_PROGRESS", "COMPLETE"]),
  isAnonymous: z.boolean(),
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
  comments: SuggestionCommentSchema.array(),
  createdBy: UserSchema,
});
export type Suggestion = z.infer<typeof SuggestionSchema>;

export const SuggestionIDParamsSchema = z.object({
  id: zStringRequired("A suggestion ID is required"),
});
export type SuggestionIDParams = z.infer<typeof SuggestionIDParamsSchema>;
export const CommentIDParamsSchema = z.object({
  id: zStringRequired("A comment ID is required"),
});
export type CommentIDParams = z.infer<typeof CommentIDParamsSchema>;

// getSuggestionList
export const GetSuggestionListQuerySchema = createQuerySchema({
  search: zQueryParam,
});
export type GetSuggestionListQuery = z.infer<
  typeof GetSuggestionListQuerySchema
>;
export const GetSuggestionListResponseSchema = z
  .object({
    ...SuggestionSchema.pick({
      id: true,
      title: true,
      description: true,
      isAnonymous: true,
    }).shape,
    createdById: z.string(),
    current_user_vote: z.literal(["LIKE", "DISLIKE", null]),
    counts: z.object({
      comments: z.number(),
      likes: z.number(),
      dislikes: z.number(),
      total: z.number(),
    }),
  })
  .array();
export type GetSuggestionListResponse = z.infer<
  typeof GetSuggestionListResponseSchema
>;

// getSuggestion
export const GetSuggestionResponseSchema = z.object({
  ...SuggestionSchema.omit({
    comments: true,
  }).shape,
  numOfComments: z.number(),
});
export type GetSuggestionResponse = z.infer<typeof GetSuggestionResponseSchema>;

// createSuggestion
export const CreateSuggestionRequestSchema = SuggestionSchema.pick({
  title: true,
  description: true,
});
export const CreateSuggestionResponseSchema = SuggestionSchema.omit({
  comments: true,
});
export type CreateSuggestionResponse = z.infer<
  typeof CreateSuggestionResponseSchema
>;

// updateSuggestion
export const UpdateSuggestionRequestSchema = SuggestionSchema.omit({
  id: true,
  createdBy: true,
  comments: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateSuggestionResponseSchema = SuggestionSchema.omit({
  comments: true,
});
export type UpdateSuggestionResponse = z.infer<
  typeof UpdateSuggestionResponseSchema
>;

export const GetSuggestionVotesParamsSchema = z.object({ id: z.string() });

// Get a suggestions reactions
export const SuggestionVoteTypeSchema = z.literal(["LIKE", "DISLIKE"]);
export type SuggestionVoteType = z.infer<typeof SuggestionVoteTypeSchema>;

// Create a suggestion vote
export const CreateSuggestionVoteRequest = z.object({
  type: SuggestionVoteTypeSchema,
});
export const CreateSuggestionVoteResponseSchema = zMessageSchema;
export type CreateSuggestionVoteResponse = z.infer<
  typeof CreateSuggestionVoteResponseSchema
>;

// Get a suggestions comments
export const GetSuggestionCommentsResponseSchema = z
  .object({
    ...SuggestionCommentSchema.omit({ createdBy: true }).shape,
    createdBy: UserSchema.pick({
      id: true,
      imageUrl: true,
      email: true,
      firstName: true,
      lastName: true,
    }),
  })
  .transform((comment) => {
    if (comment.isAnonymous) {
      return {
        ...comment,
        createdBy: {
          ...comment.createdBy,
          imageUrl: null,
          firstName: "Anonymous",
          lastName: "",
        },
      };
    }
    return comment;
  })
  .array();
export type GetSuggestionCommentsResponse = z.infer<
  typeof GetSuggestionCommentsResponseSchema
>;

// Create a comment on a suggestion
export const CreateSuggestionCommentsRequestSchema =
  SuggestionCommentSchema.pick({ isAnonymous: true, comment: true });
export type CreateSuggestionCommentsRequest = z.infer<
  typeof CreateSuggestionCommentsRequestSchema
>;
export const CreateSuggestionCommentsResponseSchema =
  SuggestionCommentSchema.omit({
    createdBy: true,
  });
export type CreateSuggestionCommentsResponse = z.infer<
  typeof CreateSuggestionCommentsResponseSchema
>;

// Delete a suggestion comment
export const DeleteSuggestionCommentResponseSchema = zMessageSchema;
