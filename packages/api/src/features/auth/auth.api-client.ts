import {
  AuthForgotPasswordRequestSchema,
  AuthResetPasswordSchema,
  AuthSignInEmailRequestSchema,
  AuthSignInSocialRequestSchema,
  type AuthForgotPasswordRequest,
  type AuthResetPassword,
  type AuthSignInEmailRequest,
  type AuthSignInSocialRequest,
} from "./auth.schema.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";
import type { auth as betterAuth } from "../../auth.js";

// Better Auth Routes
// https://github.com/better-auth/better-auth/tree/canary/packages/better-auth/src/api/routes

export class AuthClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/auth", ...options });
  }

  async signInEmail(body: AuthSignInEmailRequest) {
    return this._request({
      path: "/sign-in/email",
      method: "POST",
      body: [AuthSignInEmailRequestSchema, body],
      options: {
        contentType: "application/json",
      },
    });
  }

  /**
   * This client method signs the user in using google. It also
   * will sign the user up using google as well since the logic
   * to determine if the user is allowed into the platform is handled
   * server side. In order to sign the user up, you must send
   * the `inviteToken` into the params of the function otherwise
   * the application will think that you're trying to sign in.
   *
   * NOTE: The request URL params are to ensure that we can use some
   * values of the body without actually using the body so we can proxy
   * the raw request onto the hono handler
   */
  async signInGoogle(options: Omit<AuthSignInSocialRequest, "provider">) {
    let path = `/sign-in/social?errorCallbackURL=${options.errorCallbackURL}`;
    if (options?.inviteToken) {
      path = path.concat(`&inviteToken=${options.inviteToken}`);
    }
    return this._mutate<{ url: string; redirect: true }>({
      path,
      method: "POST",
      body: [AuthSignInSocialRequestSchema, { provider: "google", ...options }],
    });
  }

  async requestPasswordReset(body: AuthForgotPasswordRequest) {
    return this._request({
      path: "/request-password-reset",
      method: "POST",
      body: [AuthForgotPasswordRequestSchema, body],
      options: {
        contentType: "application/json",
      },
    });
  }

  async resetPassword(body: AuthResetPassword) {
    return this._request({
      path: "/reset-password",
      method: "POST",
      body: [AuthResetPasswordSchema, body],
      options: {
        contentType: "application/json",
      },
    });
  }

  async signOut() {
    return this._request({
      method: "POST",
      path: "/sign-out",
    });
  }

  async getSession() {
    return this._get<ReturnType<typeof betterAuth.api.getSession>>({
      path: "/session",
    });
  }
}
