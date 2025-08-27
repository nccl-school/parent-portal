import type { GetDirectoryResponse } from "./directory.schema.js";

import {
  ApiClient,
  type ApiClientOptions,
} from "../../api-client/ApiClient.js";

export class DirectoryClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super({ basePath: "/directory", ...options });
  }

  getEntireDirectory() {
    return this._get<GetDirectoryResponse>({
      path: "/",
    });
  }
}
