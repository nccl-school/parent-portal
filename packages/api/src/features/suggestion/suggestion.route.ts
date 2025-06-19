import { Hono } from "hono";

import { getSuggestionList } from "./suggestion.route.getSuggestionList.js";
import { getSuggestion } from "./suggestion.route.getSuggestion.js";

export const suggestion = new Hono();

suggestion.route("/", getSuggestionList);
suggestion.route("/:id", getSuggestion);
