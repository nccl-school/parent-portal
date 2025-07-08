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

    switch (event.type) {
      case "user.created":
      case "user.updated":
        console.log("User created / updated in clerk. Upserting to DB");
        console.log(event);
        await db.user.upsert({
          where: {
            email: event.data.email_addresses[0].email_address,
          },
          create: {
            extId: event.data.id,
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            email: event.data.email_addresses[0].email_address,
            status: "ACTIVE",
            roleId: event.data.public_metadata.role ?? "USER",
          },
          update: {
            extId: event.data.id,
            firstName: event.data.first_name,
            lastName: event.data.last_name,
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
