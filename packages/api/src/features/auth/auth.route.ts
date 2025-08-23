import { Hono } from "hono";

import { auth as betterAuth } from "../../auth.js";

export const auth = new Hono();

auth.all("*", async (c) => {
  return await betterAuth.handler(c.req.raw);
});

// auth.post(
//   "/sign-in/email",
//   validate("json", AuthSignInEmailRequestSchema),
//   async (c) => {
//     const body = c.req.valid("json");
//     const res = await betterAuth.api.signInEmail({
//       body,
//       asResponse: true,
//     });
//     console.log(res);
//     return res;
//   }
// );
// auth.post("/sign-in/email", async (c) => {
//   // console.log(c.req);
//   // const res = await betterAuth.handler(c.req.raw);
//   // console.log(res);
//   // return res;
//   const url = new URL(c.req.url);
//   url.pathname = "/api/auth/sign-in/email"; // 👈 rewrite to what Better Auth expects
//   const proxyReq = new Request(url.toString(), c.req.raw);
//   return await betterAuth.handler(proxyReq);
// });
