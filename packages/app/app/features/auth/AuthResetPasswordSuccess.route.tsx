import { Button } from "@nccl/components";
import { href, useNavigate } from "react-router";

import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";

import { PageHeader } from "../../components/page";
import { EmptyState } from "../../components/states/EmptyState";
import { assembleTitle } from "../../utils/util.assemble-title";

export default function AuthResetPasswordSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <title>{assembleTitle("Forgot password")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader dxTitle="Password reset successful!" />
        </AuthPageHeader>
        <AuthPageBody>
          <EmptyState
            title="Success!"
            borderless
            imgSrc="/images/image-icon-party-popper.png"
            imgAlt="party-popper"
          >
            You successfully reset your password. That's whats up. Click on the
            button below to sign in with your new password
          </EmptyState>
        </AuthPageBody>
        <AuthPageFooter>
          <Button
            dxVariant="contained"
            dxColor="secondary"
            dxSize="lg"
            onClick={() => navigate(href("/sign-in"))}
          >
            Sign in
          </Button>
        </AuthPageFooter>
      </AuthPage>
    </>
  );
}
