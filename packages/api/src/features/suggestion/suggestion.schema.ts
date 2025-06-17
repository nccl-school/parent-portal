import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import z from "zod";

const messageSchema = z.object({ message: z.string() });

export const getAll = {
  docs: describeRoute({
    description: "Get a list of the suggestions",
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": { schema: resolver(messageSchema) },
        },
      },
    },
  }),
};
