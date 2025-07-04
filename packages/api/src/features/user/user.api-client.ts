import {
  GetUserListResponseSchema,
  InviteUsersRequestSchema,
  InviteUsersResponseSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
  type InviteUsersRequest,
  type UpdateUserRoleParams,
  type UpdateUserRoleRequest,
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
    return this._get({
      path: `/`,
      //   query: [GetSuggestionListQuerySchema, query],
      serializer: GetUserListResponseSchema,
    });
  }

  /**
   * Update a users role
   */
  public async updateUserRole(
    userId: UpdateUserRoleParams,
    body: UpdateUserRoleRequest
  ) {
    return this._mutateJSON({
      method: "PUT",
      path: "/:id/role",
      params: [UpdateUserRoleParamsSchema, { id: userId }],
      body: [UpdateUserRoleRequestSchema, body],
      serializer: UpdateUserRoleResponseSchema,
    });
  }

  /**
   * Invite a group of users by email that share
   * the same role
   */
  public async inviteUsers(body: InviteUsersRequest) {
    return this._mutateJSON({
      method: "POST",
      path: "/invite",
      body: [InviteUsersRequestSchema, body],
      serializer: InviteUsersResponseSchema,
    });
  }
}
