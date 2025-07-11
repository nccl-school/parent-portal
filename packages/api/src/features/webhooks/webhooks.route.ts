import { Hono } from "hono";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/express";

import { ClerkWebhookHeaderSchema } from "./webhooks.utils.js";

import { ErrorSet } from "../../utils/util.errors.js";
import { validate } from "../../middleware/middleware.validate.js";
import { getEnvVar } from "../../utils/util.envVar.js";

export const webhooks = new Hono();

// POST /api/webhooks/clerk | Handles any webhook requests sent from clerk
webhooks.post(
  "/clerk",
  validate("header", ClerkWebhookHeaderSchema),
  async (c) => {
    const env = getEnvVar(c);
    const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET);
    const headers = c.req.valid("header");
    const payload = await c.req.text();
    const event = wh.verify(payload, headers) as WebhookEvent;
    const db = c.get("db");

    console.log(event);
    switch (event.type) {
      case "user.created":
        console.log("Running action for clerk webhook USER.CREATED");
        await db.user.update({
          where: {
            id: event.data.public_metadata.db_id,
          },
          data: {
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            email: event.data.email_addresses[0].email_address,
            imageUrl: event.data.image_url,
            status: "ACTIVE",
            invitationId: null,
            invitedAt: null,
          },
        });
        break;
      case "user.updated":
        console.log("Running action for clerk webhook USER.UPDATED");
        console.log(event.data.email_addresses);
        await db.user.update({
          where: {
            id: event.data.public_metadata.db_id,
          },
          data: {
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            imageUrl: event.data.image_url,
            status: "ACTIVE",
          },
        });
        break;

      default:
        break;
    }

    return c.body(null, 204);
  }
);

// Catchall for the route
webhooks.all("/", () => {
  throw new ErrorSet.notFound();
});
