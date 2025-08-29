import { Button, InputGroup, InputPassword, InputText } from "@nccl/components";
import { useState } from "react";
import type { AcceptInviteRequest } from "@nccl/api/client";
import {
  Form,
  href,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router";

import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";
import { AuthPasswordMeter } from "./AuthFieldPassword";

import { SocialOr } from "../../components/social/SocialOr";
import { SocialButton } from "../../components/social/SocialButton";
import { PageHeader } from "../../components/page";
import { getValidationErrors } from "../../utils/client";
import { SocialButtonGroup } from "../../components/social/SocialButtonGroup";

export function AuthAcceptInviteValid({ email }: { email: string }) {
  const [password, setPassword] = useState("");
  const [urlSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const data = useActionData();
  const errors = getValidationErrors<AcceptInviteRequest>(data);

  return (
    <AuthPage>
      <AuthPageHeader>
        <PageHeader
          dxTitle="Create your account"
          dxSubtitle="Enter your credentials to access your account"
        />
      </AuthPageHeader>
      <AuthPageBody>
        <Form method="post">
          <InputGroup>
            <input
              type="hidden"
              name="token"
              value={String(urlSearchParams.get("token"))}
            />
            <input type="hidden" name="email" value={email} />
            <InputText
              name="email"
              dxLabel="Email address"
              disabled
              value={email}
            />
            <InputGroup dxLayout="inline-stretch">
              <InputText
                name="firstName"
                dxLabel="First name"
                dxError={errors?.firstName?.[0]}
              />
              <InputText
                name="lastName"
                dxLabel="Last name"
                dxError={errors?.lastName?.[0]}
              />
            </InputGroup>
            <InputPassword
              name="password"
              dxLabel="Password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              dxError={
                errors?.password?.[0]
                  ? "Please ensure all of the requirements are checked."
                  : undefined
              }
              autoComplete="current-password"
            />
            <AuthPasswordMeter password={password} />
            {/* <InputCheckbox dxLabelOrientation="after">
          <InputLabel dxNode="div" dxLabel="I agree to the Terms and Privacy" />
        </InputCheckbox> */}
            <Button
              dxSize="lg"
              dxVariant="contained"
              dxColor="secondary"
              style={{ justifyContent: "center" }}
              type="submit"
              disabled={navigation.state !== "idle"}
            >
              {navigation.state !== "idle" ? "Loading..." : "Create Account"}
            </Button>
          </InputGroup>
        </Form>
      </AuthPageBody>
      <AuthPageFooter>
        <SocialOr />
        <Form
          method="POST"
          navigate={false}
          action={href("/api/auth/sign-in/social/:provider", {
            provider: "google",
          })}
        >
          <input
            type="hidden"
            name="inviteToken"
            value={String(urlSearchParams.get("token"))}
          />
          <SocialButtonGroup>
            <SocialButton dxType="google" type="submit" />
          </SocialButtonGroup>
        </Form>
      </AuthPageFooter>
    </AuthPage>
  );
}
