import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/express";

import { ClerkWebhookHeaderSchema } from "./webhooks.utils.js";

import { ErrorSet } from "../../utils/util.errors.js";
import { validate } from "../../middleware/middleware.validate.js";
import { getEnvVar } from "../../utils/util.envVar.js";

export const webhooks = new Hono();

webhooks
  .post(
    "/clerk",
    describeRoute({
      summary: "Clerk Webhooks", // short title used in Postman
      description: "Handles any clerk emitted webhooks",
    }),
    validate("header", ClerkWebhookHeaderSchema),
    async (c) => {
      const env = getEnvVar(c);
      const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET);
      const headers = c.req.valid("header");
      const payload = await c.req.text();
      const event = wh.verify(payload, headers) as WebhookEvent;
      const db = c.get("db");

      switch (event.type) {
        case "user.created":
          await db.user.create({
            data: {
              id: event.data.id,
              firstName: event.data.first_name,
              lastName: event.data.last_name,
              email: event.data.email_addresses[0].email_address,
            },
          });
          break;

        case "user.updated":
          await db.user.upsert({
            where: {
              id: event.data.id,
            },
            create: {
              id: event.data.id,
              firstName: event.data.first_name,
              lastName: event.data.last_name,
              email: event.data.email_addresses[0].email_address,
            },
            update: {
              firstName: event.data.first_name,
              lastName: event.data.last_name,
              email: event.data.email_addresses[0].email_address,
            },
          });
          break;

        default:
          break;
      }

      return c.body(null, 204); // return a no content
    }
  )
  .all("/", () => {
    throw new ErrorSet.notFound();
  });
