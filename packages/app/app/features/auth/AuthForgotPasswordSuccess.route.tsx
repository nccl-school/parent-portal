import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";

import { PageHeader } from "../../components/page";
import { EmptyState } from "../../components/states/EmptyState";
import { assembleTitle } from "../../utils/util.assemble-title";

export default function AuthResetPasswordSuccess() {
  return (
    <>
      <title>{assembleTitle("Forgot password")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader dxTitle="Password reset email successfully sent!" />
        </AuthPageHeader>
        <AuthPageBody>
          <EmptyState
            title="Success!"
            borderless
            imgSrc="/images/image-icon-party-popper.png"
            imgAlt="party-popper"
          >
            You should be receiving an email with some instructions on resetting
            your email.
          </EmptyState>
        </AuthPageBody>
        <AuthPageFooter>
          <div />
        </AuthPageFooter>
      </AuthPage>
    </>
  );
}
