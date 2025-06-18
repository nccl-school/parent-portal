import { Hono } from "hono";

import { getMany } from "./user.route.getMany.js";

export const user = new Hono();

user.route("/", getMany);
// user.route("/:id", getOne);
