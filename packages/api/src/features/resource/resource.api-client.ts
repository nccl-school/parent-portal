import type { z } from "zod";

import {
  CreateFolderRequestSchema,
  CreateResourceAccessRuleRequestSchema,
  MoveResourceRequestSchema,
  ParamsIDSchema,
  UpdateResourceAccessRuleRequestSchema,
  UpdateResourceMetaRequestSchema,
  type CreateResourceResponse,
  type CreateResourceAccessRuleRequest,
  type GetResourceBreadcrumbResponse,
  type GetResourceResponse,
  type GetResourceSchoolAccessRuleResponse,
  type ResourceTree,
  type UpdateResourceAccessRuleRequest,
  type UpdateResourceMetaRequest,
  CreateGoogleDocRequestSchema,
  type ViewAResourceResponse,
  CreateFileRequestSchema,
} from "./resource.schema.js";

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
    return this._mutate<CreateResourceResponse>({
      method: "POST",
      path: "/folder",
      body: [CreateFolderRequestSchema, folder],
    });
  }

  /**
   * Create a Google Doc
   */
  public async createGoogleDoc(
    googleDoc: z.infer<typeof CreateGoogleDocRequestSchema>
  ) {
    return this._mutate<CreateResourceResponse>({
      method: "POST",
      path: "/google-doc",
      body: [CreateGoogleDocRequestSchema, googleDoc],
    });
  }

  /**
   * Upload a file
   */
  public async uploadFile(file: FormData) {
    return this._mutate<CreateResourceResponse>({
      method: "POST",
      path: "/file",
      body: [CreateFileRequestSchema, file],
    });
  }

  /**
   * Delete a resource
   */
  public async delete(resourceId: string) {
    return this._delete<CreateResourceResponse>({
      path: "/:id",
      params: [ParamsIDSchema, { id: resourceId }],
    });
  }

  /**
   * Update the meta information (name, slug, description)
   */
  public async updateMeta(resourceId: string, meta: UpdateResourceMetaRequest) {
    return this._mutate({
      method: "PUT",
      path: "/:id/meta",
      params: [ParamsIDSchema, { id: resourceId }],
      body: [UpdateResourceMetaRequestSchema, meta],
    });
  }

  /**
   * Move a resource into a different directory
   */
  public async move(resourceId: string, newParentResourceId: string) {
    return this._mutate({
      method: "PUT",
      path: "/:id/move",
      params: [ParamsIDSchema, { id: resourceId }],
      body: [
        MoveResourceRequestSchema,
        { parentResourceId: newParentResourceId },
      ],
    });
  }

  /**
   * Get the unique school access record for a resource. If the record
   * exists than the resource has a school access record. If it doesn't
   * than only the user that uploaded the folder can see the resource and
   * the endpoint will return null
   */
  public async getAccessRuleSchool(resourceId: string) {
    return this._get<GetResourceSchoolAccessRuleResponse>({
      path: "/:id/access/school",
      params: [ParamsIDSchema, { id: resourceId }],
    });
  }

  /**
   * Create a new access rule for a particular resource
   */
  public async createAccessRule(
    resourceId: string,
    body: CreateResourceAccessRuleRequest
  ) {
    return this._mutate({
      method: "POST",
      path: "/:id/access",
      params: [ParamsIDSchema, { id: resourceId }],
      body: [CreateResourceAccessRuleRequestSchema, body],
    });
  }

  /**
   * Update a new access rule for a particular resource
   */
  public async updateAccessRule(
    resourceAccessId: string,
    body: UpdateResourceAccessRuleRequest
  ) {
    return this._mutate({
      method: "PUT",
      path: "/access/:id",
      params: [ParamsIDSchema, { id: resourceAccessId }],
      body: [UpdateResourceAccessRuleRequestSchema, body],
    });
  }

  /**
   * Delete an access rule for a particular resource
   */
  public async deleteAccessRule(resourceAccessId: string) {
    return this._delete({
      path: "/access/:id",
      params: [ParamsIDSchema, { id: resourceAccessId }],
    });
  }

  /**
   * View a particular resource
   */
  public async viewResource(resourceId: string) {
    return this._get<ViewAResourceResponse>({
      path: "/view/:id",
      params: [ParamsIDSchema, { id: resourceId }],
    });
  }
}
