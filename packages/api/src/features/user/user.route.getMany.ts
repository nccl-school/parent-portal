import { Hono } from "hono";
import { describeRoute } from "hono-openapi";

export const getMany = new Hono();

// Get all suggestions
getMany.get(
  "/",
  describeRoute({
    description: "Get a list of users",
  }),
  async (c) => {
    const clerkClient = c.get("clerk");
    const users = await clerkClient.users.getUserList();
    return c.json({ users });
  }
);
