import type { ApiClientOptions } from "./api-client/ApiClient.js";
import { ResourceClient } from "./features/resource/resource.api-client.js";
import { RoleClient } from "./features/role/role.api-client.js";
import { SuggestionClient } from "./features/suggestion/suggestion.api-client.js";
import { UserClient } from "./features/user/user.api-client.js";
import { ErrorSet, serializeError } from "./utils/util.errors.js";
import "./_generated/prisma/models.js";
import { AccountClient } from "./features/account/account.api-client.js";
import { auth } from "./auth.js";

export * from "./features/role/role.utils.js";
export * from "./features/suggestion/suggestion.utils.js";
export * from "./features/user/user.utils.js";
export * from "./features/resource/resource.schema.js";
export * from "./features/account/account.schema.js";

export {
  type ErrorResponse,
  ErrorResponseSchema,
} from "./utils/util.errors.js";
export { ErrorSet } from "./utils/util.errors.js";

export class NCCLClient {
  suggestion: SuggestionClient;
  user: UserClient;
  role: RoleClient;
  resource: ResourceClient;
  account: AccountClient;
  serializeError: typeof serializeError;
  #headers: Headers;

  constructor(options: ApiClientOptions) {
    this.serializeError = serializeError;
    this.suggestion = new SuggestionClient(options);
    this.user = new UserClient(options);
    this.role = new RoleClient(options);
    this.resource = new ResourceClient(options);
    this.account = new AccountClient(options);
    this.#headers = options.headers;
  }

  async signOut() {
    try {
      const res = await auth.api.signOut({ headers: this.#headers });
      return res;
    } catch {
      throw new ErrorSet.serverError(
        "There was an error when trying to sign out"
      );
    }
  }
}
