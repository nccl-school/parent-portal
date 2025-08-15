import type z from "zod";

import {
  GetUserParamsSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  type GetUserListResponse,
  type GetUserResponse,
  type UpdateUserRoleResponse,
} from "./user.utils.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class UserClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/user", ...options });
  }

  /**
   * Get a list of users
   */
  public async getUserList() {
    return this._get<GetUserListResponse>({
      path: `/`,
      //   query: [GetSuggestionListQuerySchema, query],
    });
  }

  /**
   * Get a user by ID
   */
  public async getUser(userId: string) {
    return this._get<GetUserResponse>({
      path: "/:id",
      params: [GetUserParamsSchema, { id: userId }],
    });
  }

  /**
   * Update a users role
   */
  public async updateUserRole(
    userId: string,
    body: z.infer<typeof UpdateUserRoleRequestSchema>
  ) {
    return this._mutateJSON<UpdateUserRoleResponse>({
      method: "PUT",
      path: "/:id/role",
      params: [UpdateUserRoleParamsSchema, { id: userId }],
      body: [UpdateUserRoleRequestSchema, body],
    });
  }
}
