import z from "zod/v4";

import { zCleanStringSchema, zDateStringSchema } from "../../utils/index.js";

// Base Type
export const SuggestionSchema = z.object({
  id: z.number(),
  title: zCleanStringSchema,
  status: z.union([
    z.literal("IDEA"),
    z.literal("PLANNED"),
    z.literal("IN_PROGRESS"),
    z.literal("COMPLETE"),
  ]),
  description: zCleanStringSchema,
  createdAt: zDateStringSchema,
  updatedAt: zDateStringSchema,
});
export type Suggestion = z.infer<typeof SuggestionSchema>;

// getSuggestionList
export const GetSuggestionListQuerySchema = z.object({
  search: z.string().optional(),
});
export type GetSuggestionListQuery = z.infer<
  typeof GetSuggestionListQuerySchema
>;
export const GetSuggestionListResponseSchema = SuggestionSchema.array();
export type GetSuggestionListResponse = z.infer<
  typeof GetSuggestionListResponseSchema
>;

// getSuggestion
export const GetSuggestionParamsSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
});
export type GetSuggestionParams = z.infer<typeof GetSuggestionParamsSchema>;
export const GetSuggestionResponseSchema = SuggestionSchema;
export type GetSuggestionResponse = z.infer<typeof GetSuggestionResponseSchema>;

// createSuggestion
export const CreateSuggestionRequestSchema = SuggestionSchema.pick({
  title: true,
  description: true,
});
export type CreateSuggestionRequest = z.infer<
  typeof CreateSuggestionRequestSchema
>;
export const CreateSuggestionResponseSchema = SuggestionSchema;
export type CreateSuggestionResponse = z.infer<
  typeof CreateSuggestionResponseSchema
>;

// updateSuggestion
export const UpdateSuggestionParamsSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
});
export const UpdateSuggestionRequestSchema = SuggestionSchema.omit({
  id: true,
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
