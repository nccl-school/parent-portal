import type z from "zod";

import {
  AcceptInviteRequestSchema,
  InviteUsersRequestSchema,
  ValidateTokenParamsSchema,
  type AcceptInviteRequest,
  type AcceptInviteResponse,
  type InviteUsersResponse,
  type ValidateTokenResponse,
} from "./account.schema.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class AccountClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/account", ...options });
  }

  /**
   * Invite a group of users by email that share
   * the same role
   */
  public async inviteUsers(body: z.infer<typeof InviteUsersRequestSchema>) {
    return this._mutateJSON<InviteUsersResponse>({
      method: "POST",
      path: "/invite",
      body: [InviteUsersRequestSchema, body],
    });
  }

  /**
   * Validate an invite
   */
  public async validateInviteToken(token: string) {
    return this._get<ValidateTokenResponse>({
      path: "/invite/validate/:token",
      params: [ValidateTokenParamsSchema, { token }],
    });
  }

  /**
   * Accept an invite
   */
  public async acceptInvite(body: AcceptInviteRequest) {
    return this._mutateJSON<AcceptInviteResponse>({
      method: "POST",
      path: "/invite/accept",
      body: [AcceptInviteRequestSchema, body],
    });
  }

  /**
   * Resend an invitation to a user
   */
  //   public async resendInvitation(userId: string) {
  //     return this._get<ResendInviteUserResponse>({
  //       path: "/resend-invite/:id",
  //       params: [ResendInviteUserParamsSchema, { id: userId }],
  //     });
  //   }
}
