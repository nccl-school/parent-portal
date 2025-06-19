import z from "zod";

// Base Type
export const SuggestionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updateAt: z.string(),
});

// getSuggestionList
export const GetSuggestionListApiResponseSchema = SuggestionSchema.array();
export type GetSuggestionListApiResponse = z.infer<
  typeof GetSuggestionListApiResponseSchema
>;
export const GetSuggestionListApiQuerySchema = z.object({
  search: z.string().optional(),
});
export type GetSuggestionListApiQueryParams = z.infer<
  typeof GetSuggestionListApiQuerySchema
>;

// getSuggestion
export const GetSuggestionApiParamsSchema = z.object({
  id: z.string().pipe(z.coerce.number()),
});
export const GetSuggestionApiResponseSchema = SuggestionSchema.array();
export type GetSuggestionApiResponse = z.infer<
  typeof GetSuggestionApiResponseSchema
>;
