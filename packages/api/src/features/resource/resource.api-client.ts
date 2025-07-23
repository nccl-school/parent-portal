import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";
import { GetRoleListResponseSchema } from "../role/role.utils.js";

export class ResourceClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/resource", ...options });
  }

  /**
   * Get's the deeply nested resource tree by deeply
   * nested array of folder slugs
   */
  public async getTreeByPath(pathOrSlugs: string[] | string) {
    return this._get({
      path: Array.isArray(pathOrSlugs) ? pathOrSlugs.join("/") : pathOrSlugs,
      serializer: GetRoleListResponseSchema,
    });
  }
}
