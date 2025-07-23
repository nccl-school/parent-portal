import type { GetResourceResponse, ResourceTree } from "./resource.utils.js";

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
      : pathOrSlugs || "__ROOT__";
    return this._get<ResourceTree>({
      path: `/tree/${path}`,
    });
  }

  /**
   * Gets a specific resource and it's children by
   * a slug path
   */
  public async getResourceByPath(path: string) {
    console.log({ path });
    return this._get<GetResourceResponse>({
      path: `/path/${path || "__ROOT__"}`,
    });
  }
}
