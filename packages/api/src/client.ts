import type { ApiClientOptions } from "./api-client/ApiClient.js";
import { RoleClient } from "./features/role/role.api-client.js";
import { SuggestionClient } from "./features/suggestion/suggestion.api-client.js";
import { UserClient } from "./features/user/user.api-client.js";
import { serializeError } from "./utils/util.errors.js";

export * from "./features/role/role.utils.js";
export * from "./features/suggestion/suggestion.utils.js";
export * from "./features/user/user.utils.js";
export { type ErrorResponse } from "./utils/util.errors.js";

export class NCCLClient {
  suggestion: SuggestionClient;
  user: UserClient;
  role: RoleClient;
  serializeError: typeof serializeError;

  constructor(options: ApiClientOptions) {
    this.serializeError = serializeError;
    this.suggestion = new SuggestionClient(options);
    this.user = new UserClient(options);
    this.role = new RoleClient(options);
  }
}
