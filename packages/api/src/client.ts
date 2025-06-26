// import { SuggestionClient } from "./features/suggestion/suggestion.client.js";

export class NCCLClient {
  // suggestion: SuggestionClient;

  constructor() {
    console.log("hello");
    // this.suggestion = new SuggestionClient();
  }

  log() {
    console.log("hello");
  }
}

console.log("Importing the index.client.js");

export const beans = "hello";

// Optional: prevent tree-shaking in dev
if (process.env.NODE_ENV === "development") {
  console.log("Loaded NCCLClient", NCCLClient);
}
