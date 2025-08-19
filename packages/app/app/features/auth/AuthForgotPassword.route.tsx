import z from "zod";
import { makeRem } from "@nccl/theme";
import {
  InputGroup,
  InputText,
  Button,
  Toast,
  Typography,
} from "@nccl/components";
import { Form, href, Link, useNavigation, useSearchParams } from "react-router";
import { useEffect } from "react";
import { parseError } from "@nccl/api/client";

import type { Route } from "./+types/AuthAcceptInvite.route";

import { getAuthError, getValidationErrors } from "../../utils/client";
import { PageHeader } from "../../components/page";
import { getAuthClient } from "../../utils/server";
import { getFormData } from "../../utils/isomorphic";

const schema = z.object({
  email: z
    .email({ error: "Please enter an email address" })
    .trim()
    .min(1, { error: "Please enter an email address" }),
});
type FormData = z.infer<typeof schema>;

export async function action(args: Route.ActionArgs) {
  const authClient = getAuthClient();
  const formData = await getFormData(args, schema);
  if (formData.error) {
    return parseError(formData.error);
  }

  const resetPasswordUrl = `${args.context.env.NCCL_APP_URL}${href("/reset-password")}`;
  console.log({ resetPasswordUrl });

  const res = await authClient.forgetPassword({
    headers: args.request.headers,
    body: {
      ...formData.data,
      redirectTo: resetPasswordUrl,
    },
    asResponse: true,
  });
  return res;
}

export default function AuthForgotPassword(args: Route.ComponentProps) {
  const navigation = useNavigation();
  const [urlSearchParams] = useSearchParams();
  const validationErrors = getValidationErrors<FormData>(args.actionData);
  const authError = getAuthError(args.actionData);

  useEffect(() => {
    if (!authError) return;
    Toast.error("Invalid email or password. Please try again.", {
      title: "Unable to sign in.",
    });
  }, [args.actionData, authError]);

  return (
    <Form method="post">
      <PageHeader
        style={{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: makeRem(32),
        }}
        dxTitle="Request a password reset"
        dxSubtitle="Type your email address below. If it matches an account, we’ll send a reset link."
      />
      <InputGroup>
        <input
          type="hidden"
          name="redirectURL"
          value={urlSearchParams.get("redirectURL") ?? undefined}
        />
        <InputText
          name="email"
          dxLabel="Email address"
          autoComplete="username"
          dxError={validationErrors.email?.[0]}
        />
        <Link to={href("/sign-in")}>
          <Typography dxVariant="body3" dxNode="span">
            Back to sign in
          </Typography>
        </Link>
        <Button
          dxSize="md"
          dxVariant="contained"
          dxColor="secondary"
          style={{ justifyContent: "center" }}
          type="submit"
          disabled={navigation.state !== "idle"}
        >
          {navigation.state !== "idle"
            ? "Loading..."
            : "Request password reset"}
        </Button>
      </InputGroup>
    </Form>
  );
}
