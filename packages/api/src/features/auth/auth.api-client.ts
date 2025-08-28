import {
  AuthForgotPasswordRequestSchema,
  AuthResetPasswordSchema,
  AuthSignInEmailRequestSchema,
  AuthSignInSocialRequestSchema,
  type AuthForgotPasswordRequest,
  type AuthResetPassword,
  type AuthSignInEmailRequest,
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

  async signInGoogle() {
    return this._mutateJSON<{ url: string; redirect: true }>({
      path: "/sign-in/social",
      method: "POST",
      body: [AuthSignInSocialRequestSchema, { provider: "google" }],
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
