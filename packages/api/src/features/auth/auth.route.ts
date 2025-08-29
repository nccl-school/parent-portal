import { Hono } from "hono";

import { auth as betterAuth } from "../../auth.js";
import {
  acceptInviteAndMarkTokenUsed,
  findValidToken,
} from "../account/account.utils.js";

export const auth = new Hono();

auth.get("/session", async (c) => {
  const session = await betterAuth.api.getSession(c.req.raw);
  return c.json(session ?? { session: null, user: null });
});

auth.post("/sign-in/social", async (c) => {
  const db = c.get("db");
  const url = new URL(c.req.url);
  const inviteToken = url.searchParams.get("inviteToken");
  const errorCallbackURL = url.searchParams.get("errorCallbackURL");

  // The user is trying to sign up in some fashion since
  // a token has been provided
  if (inviteToken) {
    // Check to see if the invite token is valid
    const invite = await findValidToken(db.accountToken, {
      type: "INVITE",
      rawToken: inviteToken,
    });

    if (!invite) {
      return c.json({
        url: `${errorCallbackURL}?error=INVALID_INVITE`,
        redirect: true,
      });
    }

    await acceptInviteAndMarkTokenUsed(db.accountToken, {
      tokenId: invite.id,
      acceptedById: "social-sign-up",
    });
  }

  // There is no token in the state so we can assume
  // the user is trying to sign in. We then proxy the request
  // on and check if they have accepted their invite into the
  // platform before the creation of the user in the auth.tsx
  // `databaseHooks.user.create` hook
  return betterAuth.handler(c.req.raw);
});

auth.get("/callback/google", async (c) => {
  const res = await betterAuth.handler(c.req.raw);
  const location = res.headers.get("Location");
  if (res.status === 302 && location?.includes("error=unable_to_create_user")) {
    const newLocation = location.replace(
      "error=unable_to_create_user",
      "error=INVITE_NOT_ACCEPTED"
    );
    res.headers.set("Location", newLocation);
  }
  return res;
});

auth.all("*", async (c) => {
  return await betterAuth.handler(c.req.raw);
});
