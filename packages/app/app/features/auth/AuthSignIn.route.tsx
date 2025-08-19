import z from "zod";
import { makeRem } from "@nccl/theme";
import {
  InputGroup,
  InputText,
  InputPassword,
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
  password: z
    .string({ error: "Please enter a password" })
    .trim()
    .min(1, { error: "Please enter a password" }),
  rememberMe: z.boolean().optional(),
  redirectURL: z.string().optional(),
});

export async function action(args: Route.ActionArgs) {
  const authClient = getAuthClient();
  const formData = await getFormData(args, schema);
  if (formData.error) {
    return parseError(formData.error);
  }

  const url = new URL(args.request.url);
  const redirectURL = url.searchParams.get("redirectURL");

  const callbackURL = redirectURL
    ? `${args.context.env.NCCL_APP_URL}/${redirectURL}`
    : args.context.env.NCCL_APP_URL;

  // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
  const res = await authClient.signInEmail({
    headers: args.request.headers,
    body: {
      ...formData.data,
      callbackURL,
    },
    asResponse: true,
  });
  return res;
}

export default function AuthAcceptInviteRoute(args: Route.ComponentProps) {
  const navigation = useNavigation();
  const [urlSearchParams] = useSearchParams();
  const errors = getValidationErrors<z.infer<typeof schema>>(args.actionData);
  const authError = getAuthError(args.actionData);

  useEffect(() => {
    if (!authError) return;
    Toast.error("Invalid email or password. Please try again.", {
      title: "Unable to sign in.",
      duration: 5_000,
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
        dxTitle="Welcome back!"
        dxSubtitle="Enter your credentials to sign into the parent portal"
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
          dxError={errors.email?.[0]}
        />
        <InputPassword
          name="password"
          dxLabel="Password"
          autoComplete="current-password"
          dxError={errors.password?.[0]}
        />
        <Link to={href("/forgot-password")}>
          <Typography dxVariant="body3" dxNode="span">
            Forgot password?
          </Typography>
        </Link>

        {/* <InputCheckbox dxLabelOrientation="after">
          <InputLabel dxNode="div" dxLabel="I agree to the Terms and Privacy" />
        </InputCheckbox> */}
        <br />
        <Button
          dxSize="md"
          dxVariant="contained"
          dxColor="secondary"
          style={{ justifyContent: "center" }}
          type="submit"
          disabled={navigation.state !== "idle"}
        >
          {navigation.state !== "idle" ? "Loading..." : "Sign in"}
        </Button>
      </InputGroup>
    </Form>
  );
}
