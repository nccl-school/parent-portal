import { Button } from "@nccl/components";
import { useNavigate, href } from "react-router";

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
      <title>{assembleTitle("Sign up")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader dxTitle="Account created successfully!" />
        </AuthPageHeader>
        <AuthPageBody>
          <EmptyState
            title="Success!"
            borderless
            imgSrc="/images/image-icon-party-popper.png"
            imgAlt="party-popper"
          >
            This is great news! Your account has been successfully created and
            you can now access the application. Use the button below to sign
            into the portal.
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
