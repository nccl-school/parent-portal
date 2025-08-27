import z from "zod";
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
import { AuthPageFooter } from "./AuthPageFooter";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPage } from "./AuthPage";

import { getAuthError, getValidationErrors } from "../../utils/client";
import { PageHeader } from "../../components/page";
import { getNCCLClient } from "../../utils/server";
import { getFormData } from "../../utils/isomorphic";
import { assembleTitle } from "../../utils/util.assemble-title";

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
  redirect_url: z.string().optional(),
});

export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  const formData = await getFormData(args, schema);
  if (formData.error) {
    return parseError(formData.error);
  }

  const url = new URL(args.request.url);
  const redirect_url =
    url.searchParams.get("redirect_url") ?? args.context.env.NCCL_APP_URL;

  // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
  return await ncclClient.auth.signInEmail({
    email: formData.data.email,
    password: formData.data.password,
    callbackUrl: redirect_url,
  });
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
      <title>{assembleTitle("Sign in")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader
            dxTitle="Welcome back!"
            dxSubtitle="Enter your credentials to sign into the parent portal"
          />
        </AuthPageHeader>
        <AuthPageBody>
          <InputGroup>
            <input
              type="hidden"
              name="redirect_url"
              value={urlSearchParams.get("redirect_url") ?? undefined}
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
          </InputGroup>
        </AuthPageBody>
        <AuthPageFooter>
          <Button
            dxSize="lg"
            dxVariant="contained"
            dxColor="secondary"
            style={{ justifyContent: "center" }}
            type="submit"
            disabled={navigation.state !== "idle"}
          >
            {navigation.state !== "idle" ? "Loading..." : "Sign in"}
          </Button>
        </AuthPageFooter>
      </AuthPage>
    </Form>
  );
}
