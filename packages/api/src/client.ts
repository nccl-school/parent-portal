import type { ApiClientOptions } from "./api-client/ApiClient.js";
import { SuggestionClient } from "./features/suggestion/suggestion.api-client.js";

export { serializeError } from "./utils/util.errors.js";
export class NCCLClient {
  suggestion: SuggestionClient;

  constructor(options: ApiClientOptions) {
    this.suggestion = new SuggestionClient(options);
  }
}
