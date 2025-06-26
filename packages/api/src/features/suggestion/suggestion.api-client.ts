import {
  CreateSuggestionRequestSchema,
  CreateSuggestionResponseSchema,
  GetSuggestionListQuerySchema as GetSuggestionListQuerySchema,
  GetSuggestionListResponseSchema,
  GetSuggestionParamsSchema,
  GetSuggestionResponseSchema,
  UpdateSuggestionParamsSchema,
  UpdateSuggestionRequestSchema,
  UpdateSuggestionResponseSchema,
  type CreateSuggestionRequest,
  type GetSuggestionListQuery,
  type UpdateSuggestionRequest,
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
  public async getSuggestionList(query?: GetSuggestionListQuery) {
    return this._get({
      path: `/`,
      query: [GetSuggestionListQuerySchema, query],
      serializer: GetSuggestionListResponseSchema,
    });
  }

  /**
   *  Get a single suggestion by ID
   */
  async getSuggestion(id: number) {
    return this._get({
      path: "/:id",
      params: [GetSuggestionParamsSchema, { id }],
      serializer: GetSuggestionResponseSchema,
    });
  }

  /**
   * Create a new suggestion
   */
  async createSuggestion(suggestion: CreateSuggestionRequest) {
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
  async updateSuggestion(id: number, suggestion: UpdateSuggestionRequest) {
    return this._mutateJSON({
      method: "PUT",
      path: "/:id",
      params: [UpdateSuggestionParamsSchema, { id }],
      body: [UpdateSuggestionRequestSchema, suggestion],
      serializer: UpdateSuggestionResponseSchema,
    });
  }
}
