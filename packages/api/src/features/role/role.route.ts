import { Hono } from "hono";

import { GetRoleListResponseSchema } from "./role.utils.js";

import { authorize } from "../../middleware/middleware.authorize.js";
import { serialize } from "../../utils/util.serialize.js";

export const role = new Hono();

// GET /api/role | Get a list of roles
role.get("/", authorize("ADMIN"), async (c) => {
  const db = c.get("db");
  const roles = await db.role.findMany();
  const data = await serialize(GetRoleListResponseSchema, roles);
  return c.json(data);
});
