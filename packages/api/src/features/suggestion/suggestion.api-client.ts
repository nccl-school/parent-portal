import type z from "zod/v4";

import {
  SuggestionIDParamsSchema,
  CreateSuggestionRequestSchema,
  GetSuggestionListQuerySchema,
  GetSuggestionListResponseSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionRequestSchema,
  UpdateSuggestionResponseSchema,
  CreateSuggestionVoteRequest,
  CreateSuggestionResponseSchema,
  CreateSuggestionVoteResponse,
  GetSuggestionCommentsResponseSchema,
  CreateSuggestionCommentsRequestSchema,
  CreateSuggestionCommentsResponseSchema,
  DeleteSuggestionCommentResponseSchema,
  CommentIDParamsSchema,
} from "./suggestion.utils.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class SuggestionClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/suggestion", ...options });
  }

  /**
   * Get a list of suggestions
   */
  public async getSuggestionList(
    query?: z.infer<typeof GetSuggestionListQuerySchema>
  ) {
    return this._get({
      path: `/`,
      query: [GetSuggestionListQuerySchema, query],
      serializer: GetSuggestionListResponseSchema,
    });
  }

  /**
   *  Get a single suggestion by ID
   */
  async getSuggestion(id: string) {
    return this._get({
      path: "/:id",
      params: [SuggestionIDParamsSchema, { id }],
      serializer: GetSuggestionResponseSchema,
    });
  }

  /**
   * Create a new suggestion
   */
  async createSuggestion(
    suggestion: z.infer<typeof CreateSuggestionRequestSchema>
  ) {
    return this._mutateJSON({
      method: "POST",
      path: "/",
      body: [CreateSuggestionRequestSchema, suggestion],
      serializer: CreateSuggestionResponseSchema,
    });
  }

  /**
   * Updates an existing suggestion
   */
  async updateSuggestion(
    id: string,
    suggestion: z.infer<typeof UpdateSuggestionRequestSchema>
  ) {
    return this._mutateJSON({
      method: "PUT",
      path: "/:id",
      params: [SuggestionIDParamsSchema, { id }],
      body: [UpdateSuggestionRequestSchema, suggestion],
      serializer: UpdateSuggestionResponseSchema,
    });
  }

  /**
   * Vote on a suggestion
   */
  async likeOrDislike(
    suggestionId: string,
    body: z.infer<typeof CreateSuggestionVoteRequest>
  ) {
    return this._mutateJSON({
      method: "POST",
      path: "/:id/vote",
      params: [SuggestionIDParamsSchema, { id: suggestionId }],
      body: [CreateSuggestionVoteRequest, body],
      serializer: CreateSuggestionVoteResponse,
    });
  }

  /**
   * Get a list of the comments that have been added to a suggestion
   * in descending order ()
   */
  async getCommentsList(suggestionId: string) {
    return this._get({
      path: "/:id/comment",
      params: [SuggestionIDParamsSchema, { id: suggestionId }],
      serializer: GetSuggestionCommentsResponseSchema,
    });
  }

  /**
   * Adds a comment to a specific suggestion
   */
  async addCommentToSuggestion(
    suggestionId: string,
    comment: z.infer<typeof CreateSuggestionCommentsRequestSchema>
  ) {
    return this._mutateJSON({
      method: "POST",
      path: "/:id/comment",
      params: [SuggestionIDParamsSchema, { id: suggestionId }],
      body: [CreateSuggestionCommentsRequestSchema, comment],
      serializer: CreateSuggestionCommentsResponseSchema,
    });
  }

  async deleteComment(suggestionCommentId: string) {
    return this._delete({
      path: "/comment/:id",
      params: [CommentIDParamsSchema, { id: suggestionCommentId }],
      serializer: DeleteSuggestionCommentResponseSchema,
    });
  }
}
