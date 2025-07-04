import type { ApiClientOptions } from "./api-client/ApiClient.js";
import { RoleClient } from "./features/role/role.api-client.js";
import { SuggestionClient } from "./features/suggestion/suggestion.api-client.js";
import { UserClient } from "./features/user/user.api-client.js";

export { serializeError } from "./utils/util.errors.js";
export class NCCLClient {
  suggestion: SuggestionClient;
  user: UserClient;
  role: RoleClient;

  constructor(options: ApiClientOptions) {
    this.suggestion = new SuggestionClient(options);
    this.user = new UserClient(options);
    this.role = new RoleClient(options);
  }
}
