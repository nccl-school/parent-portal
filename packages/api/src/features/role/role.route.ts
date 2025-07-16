import { Hono } from "hono";

import { GetRoleListResponseSchema } from "./role.utils.js";

import { authorize } from "../../middleware/middleware.authorize.js";
import { serialize } from "../../utils/util.serialize.js";

export const role = new Hono();

// GET /api/role | Get a list of roles
role.get("/", authorize("ADMIN"), async (c) => {
  console.log("getting db");
  const db = c.get("db");
  console.log("getting many from db");
  const roles = await db.role.findMany();
  console.log("serializing");
  const data = await serialize(GetRoleListResponseSchema, roles);
  return c.json(data);
});
