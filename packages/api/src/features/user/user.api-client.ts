import {
  GetUserListResponseSchema,
  GetUserParamsSchema,
  GetUserResponseSchema,
  InviteUsersRequestSchema,
  InviteUsersResponseSchema,
  ResendInviteUserParamsSchema,
  ResendInviteUserResponseSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
  type InviteUsersRequest,
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
   * Get a user by ID
   */
  public async getUser(userId: string) {
    return this._get({
      path: "/:id",
      params: [GetUserParamsSchema, { id: userId }],
      serializer: GetUserResponseSchema,
    });
  }

  /**
   * Update a users role
   */
  public async updateUserRole(userId: string, body: UpdateUserRoleRequest) {
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

  /**
   * Resend an invitation to a user
   */
  public async resendInvitation(userId: string) {
    return this._get({
      path: "/resend-invite/:id",
      params: [ResendInviteUserParamsSchema, { id: userId }],
      serializer: ResendInviteUserResponseSchema,
    });
  }
}
