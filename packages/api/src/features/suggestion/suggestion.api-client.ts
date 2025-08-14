import type z from "zod/v4";

import {
  SuggestionIDParamsSchema,
  CreateSuggestionRequestSchema,
  GetSuggestionListQuerySchema,
  UpdateSuggestionRequestSchema,
  CreateSuggestionVoteRequest,
  CreateSuggestionCommentsRequestSchema,
  CommentIDParamsSchema,
  type GetSuggestionListResponse,
  type GetSuggestionResponse,
  type GetSuggestionCommentsResponse,
  type CreateSuggestionResponse,
  type UpdateSuggestionResponse,
  type CreateSuggestionVoteResponse,
  type CreateSuggestionCommentsResponse,
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
    return this._get<GetSuggestionListResponse>({
      path: `/`,
      query: [GetSuggestionListQuerySchema, query],
    });
  }

  /**
   *  Get a single suggestion by ID
   */
  async getSuggestion(id: string) {
    return this._get<GetSuggestionResponse>({
      path: "/:id",
      params: [SuggestionIDParamsSchema, { id }],
    });
  }

  /**
   * Create a new suggestion
   */
  async createSuggestion(
    suggestion: z.infer<typeof CreateSuggestionRequestSchema>
  ) {
    return this._mutateJSON<CreateSuggestionResponse>({
      method: "POST",
      path: "/",
      body: [CreateSuggestionRequestSchema, suggestion],
    });
  }

  /**
   * Updates an existing suggestion
   */
  async updateSuggestion(
    id: string,
    suggestion: z.infer<typeof UpdateSuggestionRequestSchema>
  ) {
    return this._mutateJSON<UpdateSuggestionResponse>({
      method: "PUT",
      path: "/:id",
      params: [SuggestionIDParamsSchema, { id }],
      body: [UpdateSuggestionRequestSchema, suggestion],
    });
  }

  /**
   * Vote on a suggestion
   */
  async likeOrDislike(
    suggestionId: string,
    body: z.infer<typeof CreateSuggestionVoteRequest>
  ) {
    return this._mutateJSON<CreateSuggestionVoteResponse>({
      method: "POST",
      path: "/:id/vote",
      params: [SuggestionIDParamsSchema, { id: suggestionId }],
      body: [CreateSuggestionVoteRequest, body],
    });
  }

  /**
   * Get a list of the comments that have been added to a suggestion
   * in descending order ()
   */
  async getCommentsList(suggestionId: string) {
    return this._get<GetSuggestionCommentsResponse>({
      path: "/:id/comment",
      params: [SuggestionIDParamsSchema, { id: suggestionId }],
    });
  }

  /**
   * Adds a comment to a specific suggestion
   */
  async addCommentToSuggestion(
    suggestionId: string,
    comment: z.infer<typeof CreateSuggestionCommentsRequestSchema>
  ) {
    return this._mutateJSON<CreateSuggestionCommentsResponse>({
      method: "POST",
      path: "/:id/comment",
      params: [SuggestionIDParamsSchema, { id: suggestionId }],
      body: [CreateSuggestionCommentsRequestSchema, comment],
    });
  }

  async deleteComment(suggestionCommentId: string) {
    return this._delete({
      path: "/comment/:id",
      params: [CommentIDParamsSchema, { id: suggestionCommentId }],
    });
  }
}
