import z from "zod";

// Base Type
export const SuggestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updateAt: z.string(),
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
