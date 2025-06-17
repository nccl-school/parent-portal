import { Hono } from "hono";

import { getMany } from "./suggestion.route.getMany.js";
import { getOne } from "./suggestion.route.getOne.js";

export const suggestion = new Hono();

// Get all suggestions
suggestion.route("/", getMany);
suggestion.route("/:id", getOne);
