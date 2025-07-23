import type { ResourceTree } from "./resource.utils.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class ResourceClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/resource", ...options });
  }

  /**
   * Get's the deeply nested resource tree by deeply
   * nested array of folder slugs
   */
  public async getTreeByPath(pathOrSlugs: string[] | string) {
    const path = Array.isArray(pathOrSlugs)
      ? pathOrSlugs.join("/")
      : pathOrSlugs;
    console.log({ path });
    return this._get<ResourceTree>({
      path: `/tree/${path}`,
    });
  }
}
