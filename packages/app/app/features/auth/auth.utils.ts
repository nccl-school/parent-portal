import { href, type ActionFunctionArgs } from "react-router";
import z from "zod/v4";
import { parseError, ErrorSet, type ErrorResponse } from "@nccl/api/client";

import { getFormData } from "../../utils/isomorphic";
import { getNCCLClient } from "../../utils/server";

const schema = z.object({
  email: z
    .email({ error: "Please enter an email address" })
    .trim()
    .min(1, { error: "Please enter an email address" }),
});
export type RequestPasswordResetForm = z.infer<typeof schema>;

export async function requestPasswordResetEmail<T extends ActionFunctionArgs>(
  args: T
): Promise<
  { ok: false; error: ErrorResponse } | { ok: true; error: undefined }
> {
  const authClient = getNCCLClient(args);
  const formData = await getFormData(args, schema);
  if (formData.error) {
    return { ok: false, error: parseError(formData.error) };
  }

  const resetPasswordUrl = `${args.context.env.NCCL_APP_URL}${href("/reset-password")}`;

  const res = await authClient.auth.requestPasswordReset({
    ...formData.data,
    redirectTo: resetPasswordUrl,
  });
  if (!res.ok) {
    console.log(res.text());
    const json = await res.json();
    console.error(json);
    const err = new ErrorSet.serverError(
      json?.message ?? "Error when trying to send a password reset email."
    );
    return { ok: false, error: parseError(err) };
  }
  return { ok: true, error: undefined };
}
