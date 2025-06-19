import { SuggestionClient } from "./features/suggestion/suggestion.client.js";

export class NCCLClient {
  suggestion: SuggestionClient;

  constructor() {
    this.suggestion = new SuggestionClient();
  }
}
