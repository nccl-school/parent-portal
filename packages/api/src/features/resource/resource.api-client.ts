import type { z } from "zod/v4";

import {
  CreateFolderRequestSchema,
  ResourceIDParamsSchema,
  UpdateResourceMetaRequestSchema,
  type CreateFolderResponse,
  type GetResourceBreadcrumbResponse,
  type GetResourceResponse,
  type ResourceTree,
  type UpdateResourceMetaRequest,
} from "./resource.utils.js";

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
    return this._get<GetResourceResponse>({
      path: `/path/${path || "__ROOT__"}`,
    });
  }

  /**
   * Gets the breadcrumb for a provided path
   * of slugs
   */
  public async getPathBreadcrumb(path: string) {
    return this._get<GetResourceBreadcrumbResponse>({
      path: `/breadcrumb/${path || "__ROOT__"}`,
    });
  }

  /**
   * Create a new folder
   */
  public async createFolder(folder: z.infer<typeof CreateFolderRequestSchema>) {
    return this._mutateJSON<CreateFolderResponse>({
      method: "POST",
      path: "/folder",
      body: [CreateFolderRequestSchema, folder],
    });
  }

  /**
   * Delete a resource
   */
  public async delete(resourceId: string) {
    return this._delete<CreateFolderResponse>({
      path: "/:id",
      params: [ResourceIDParamsSchema, { id: resourceId }],
    });
  }

  /**
   * Update the meta information (name, slug, description)
   */
  public async updateMeta(resourceId: string, meta: UpdateResourceMetaRequest) {
    return this._mutateJSON({
      method: "PUT",
      path: "/:id/meta",
      params: [ResourceIDParamsSchema, { id: resourceId }],
      body: [UpdateResourceMetaRequestSchema, meta],
    });
  }
}
