import z from "zod";

import type { Route } from "./+types/api.auth.signOut";

import { validateFormData } from "../utils/isomorphic";
import { getAuthClient } from "../utils/server";

const signInEmailSchema = z.object({
  email: z.string(),
  password: z.string(),
  rememberMe: z.boolean(),
});

export async function action(args: Route.ActionArgs) {
  const authClient = getAuthClient();
  const formData = await args.request.formData();

  const url = new URL(args.request.url);
  const callback_url = url.searchParams.get("callback_url");

  const body = await validateFormData(signInEmailSchema, formData);

  const callbackURL = callback_url
    ? `${args.context.env.NCCL_APP_URL}/${callback_url}`
    : args.context.env.NCCL_APP_URL;

  // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
  const res = await authClient.signInEmail({
    headers: args.request.headers,
    body: {
      ...body,
      callbackURL,
    },
    asResponse: true,
  });
  return res;
}
