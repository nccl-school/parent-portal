import { Hono } from "hono";

import { getMany } from "./user.route.getMany.js";
import {
  CreateUserRequestSchema,
  InviteUsersRequestSchema,
} from "./user.utils.js";

import { validate } from "../../middleware/middleware.validate.js";
import { ErrorSet } from "../../utils/util.errors.js";

export const user = new Hono();

user
  .get("/", getMany)
  .post("/invite", validate("json", InviteUsersRequestSchema), async (c) => {
    const body = c.req.valid("json");
    const db = c.get("db");
    const clerk = c.get("clerk");

    const clerkUser = clerk.users.createUser({
      firstName: body.firstName ?? "",
      lastName: body.lastName,
    });
  })
  .all(() => {
    throw new ErrorSet.notFound("");
  });
