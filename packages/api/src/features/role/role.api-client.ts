import { GetRoleListResponseSchema } from "./role.utils.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class RoleClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/role", ...options });
  }

  /**
   * Get a list of roles
   */
  public async getRoleList() {
    return this._get({
      path: `/`,
      serializer: GetRoleListResponseSchema,
    });
  }
}
