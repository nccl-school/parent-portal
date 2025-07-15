import z from "zod/v4";

export const ClerkWebhookHeaderSchema = z.object({
  "svix-id": z.string(),
  "svix-timestamp": z.string(),
  "svix-signature": z.string(),
});
