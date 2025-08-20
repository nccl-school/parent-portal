import { Hono } from "hono";

import { GetDirectoryResponseSchema } from "./directory.schema.js";

import { serialize } from "../../utils/util.serialize.js";

export const directory = new Hono();

// GET /api/directory | Get all users in the app
directory.get("/", async (c) => {
  const db = c.get("db");
  const users = await db.user.findMany({
    where: {
      isSuper: false,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      imageUrl: true,
      phone: true,
      role: true,
    },
  });
  const data = await serialize(GetDirectoryResponseSchema, users);
  return c.json(data);
});
