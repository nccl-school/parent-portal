import {
  AuthSignInEmailRequestSchema,
  type AuthSignInEmailRequest,
} from "./auth.schema.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";
import type { auth as betterAuth } from "../../auth.js";

export class AuthClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/auth", ...options });
  }

  async signInEmail(body: AuthSignInEmailRequest) {
    return this._request({
      path: "/sign-in/email",
      method: "POST",
      body: [AuthSignInEmailRequestSchema, body],
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
