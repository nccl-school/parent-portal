import z from "zod";
import {
  InputGroup,
  InputText,
  InputPassword,
  Button,
  Toast,
  Typography,
} from "@nccl/components";
import { Form, href, Link, useSearchParams } from "react-router";
import { useEffect } from "react";
import { parseError } from "@nccl/api/client";
import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";

import type { Route } from "./+types/AuthAcceptInvite.route";
import { AuthPageFooter } from "./AuthPageFooter";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPage } from "./AuthPage";

import { SocialButton } from "../../components/social/SocialButton";
import { getAuthError, getValidationErrors } from "../../utils/client";
import { PageHeader } from "../../components/page";
import { getNCCLClient } from "../../utils/server";
import { getFormData } from "../../utils/isomorphic";
import { assembleTitle } from "../../utils/util.assemble-title";
import { useIsSubmitting } from "../../hooks/hook.useIsSubmitting";
import { SocialButtonGroup } from "../../components/social/SocialButtonGroup";

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

const styles = css`
  height: ${makeRem(48)};
  display: grid;
  place-content: center;
  position: relative;
  line-height: ${makeRem(48)};

  ${makeResponsive({ from: "laptop" })} {
    margin-bottom: ${makeRem(16)};
  }

  & > div {
    padding: 0 ${makeRem(16)};
    background: ${makeColor("white")};
    z-index: 10;
    color: ${makeColor("neutral-dark-200")};
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 1px;
    background-color: ${makeColor("light-500")};
    width: 100%;
  }
`;

export default function AuthAcceptInviteRoute(args: Route.ComponentProps) {
  const isSubmitting = useIsSubmitting();
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
    <AuthPage>
      <title>{assembleTitle("Sign in")}</title>
      <AuthPageHeader>
        <PageHeader
          dxTitle="Welcome back!"
          dxSubtitle="Enter your credentials to sign into the parent portal"
        />
      </AuthPageHeader>
      <AuthPageBody>
        <Form method="post">
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
            <Button
              dxSize="lg"
              dxVariant="contained"
              dxColor="secondary"
              style={{ justifyContent: "center" }}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Sign in"}
            </Button>
          </InputGroup>
        </Form>
      </AuthPageBody>
      <AuthPageFooter>
        <Typography dxVariant="body3" dxNode="div" className={styles}>
          <div>or continue with</div>
        </Typography>
        <SocialButtonGroup>
          <Form
            method="POST"
            navigate={false}
            action={href("/api/auth/sign-in/social/:provider", {
              provider: "google",
            })}
          >
            <SocialButton dxType="google" type="submit" />
          </Form>
        </SocialButtonGroup>
      </AuthPageFooter>
    </AuthPage>
  );
}
