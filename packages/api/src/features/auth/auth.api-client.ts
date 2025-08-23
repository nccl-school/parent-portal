import {
  AuthSignInEmailRequestSchema,
  type AuthSignInEmailRequest,
} from "./auth.schema.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

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
}
