import type z from "zod/v4";

import {
  GetSuggestionListApiQuerySchema,
  GetSuggestionApiParamsSchema,
  GetSuggestionApiResponseSchema,
  type GetSuggestionListApiQueryParams,
} from "./suggestion.utils.js";

import { ApiClient } from "../../api-client/ApiClient.js";

export class SuggestionClient extends ApiClient {
  constructor() {
    super({ basePath: "/suggestion" });
  }

  /**
   * Get a list of suggestions
   */
  async getSuggestionList(query?: GetSuggestionListApiQueryParams) {
    return this._get({
      path: `/`,
      query: [GetSuggestionListApiQuerySchema, query],
      serializer: GetSuggestionApiResponseSchema,
    });
  }

  /**
   *  Get a single suggestion by ID
   */
  async getSuggestion(id: number) {
    return this._get({
      path: "/:id",
      params: [GetSuggestionApiParamsSchema, { id }],
      serializer: GetSuggestionApiResponseSchema,
    });
  }
}
