import z from "zod/v4";

import {
  zCleanStringSchema,
  zDateStringSchema,
} from "../../utils/util.schema.js";
import { UserSchema } from "../user/user.utils.js";

export const SuggestionCommentSchema = z.object({
  id: z.string(),
  comment: z.string(),
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

// getSuggestionList
export const GetSuggestionListQuerySchema = z.object({
  search: z.string().optional(),
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
    }),
  })
  .array();
export type GetSuggestionListResponse = z.infer<
  typeof GetSuggestionListResponseSchema
>;

// getSuggestion
export const GetSuggestionParamsSchema = z.object({
  id: z.string(),
});
export type GetSuggestionParams = z.infer<typeof GetSuggestionParamsSchema>;
export const GetSuggestionResponseSchema = SuggestionSchema.omit({
  comments: true,
});
export type GetSuggestionResponse = z.infer<typeof GetSuggestionResponseSchema>;

// createSuggestion
export const CreateSuggestionRequestSchema = SuggestionSchema.pick({
  title: true,
  description: true,
});
export type CreateSuggestionRequest = z.infer<
  typeof CreateSuggestionRequestSchema
>;
export const CreateSuggestionResponseSchema = SuggestionSchema.omit({
  comments: true,
});
export type CreateSuggestionResponse = z.infer<
  typeof CreateSuggestionResponseSchema
>;

// updateSuggestion
export const UpdateSuggestionParamsSchema = z.object({
  id: z.string(),
});
export const UpdateSuggestionRequestSchema = SuggestionSchema.omit({
  id: true,
  createdBy: true,
  comments: true,
  createdAt: true,
  updatedAt: true,
});
export type UpdateSuggestionRequest = z.infer<
  typeof UpdateSuggestionRequestSchema
>;
export const UpdateSuggestionResponseSchema = SuggestionSchema;
export type UpdateSuggestionResponse = z.infer<
  typeof UpdateSuggestionResponseSchema
>;

export const GetSuggestionVotesParamsSchema = z.object({ id: z.string() });

// Get a suggestions reactions
export const SuggestionVoteTypeSchema = z.literal(["LIKE", "DISLIKE"]);
export type SuggestionVoteType = z.infer<typeof SuggestionVoteTypeSchema>;

// Create a suggestion vote
export const CreateSuggestionVoteParams = z.object({ id: z.string() });
export const CreateSuggestionVoteRequest = z.object({
  type: SuggestionVoteTypeSchema,
});
