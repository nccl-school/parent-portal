import type z from "zod/v4";

import {
  GetUserParamsSchema,
  InviteUsersRequestSchema,
  InviteUsersResponseSchema,
  ResendInviteUserParamsSchema,
  UpdateUserRoleParamsSchema,
  UpdateUserRoleRequestSchema,
  UpdateUserRoleResponseSchema,
  type GetUserListResponse,
  type GetUserResponse,
  type ResendInviteUserResponse,
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
  public async inviteUsers(body: z.infer<typeof InviteUsersRequestSchema>) {
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
    return this._get<ResendInviteUserResponse>({
      path: "/resend-invite/:id",
      params: [ResendInviteUserParamsSchema, { id: userId }],
    });
  }
}
