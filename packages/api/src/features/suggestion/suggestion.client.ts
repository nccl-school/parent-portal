import {
  CreateSuggestionRequestSchema,
  CreateSuggestionResponseSchema,
  GetSuggestionListQuerySchema as GetSuggestionListQuerySchema,
  GetSuggestionParamsSchema,
  GetSuggestionResponseSchema,
  type CreateSuggestionRequest,
  type GetSuggestionListQuery,
} from "./suggestion.utils.js";

import { ApiClient } from "../../api-client/ApiClient.js";

export class SuggestionClient extends ApiClient {
  constructor() {
    super({ basePath: "/suggestion" });
  }

  /**
   * Get a list of suggestions
   */
  async getSuggestionList(query?: GetSuggestionListQuery) {
    return this._get({
      path: `/`,
      query: [GetSuggestionListQuerySchema, query],
      serializer: GetSuggestionResponseSchema,
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

  async createSuggestion(suggestion: CreateSuggestionRequest) {
    return this._postJSON({
      path: "/",
      body: [CreateSuggestionRequestSchema, suggestion],
      serializer: CreateSuggestionResponseSchema,
    });
  }
}
