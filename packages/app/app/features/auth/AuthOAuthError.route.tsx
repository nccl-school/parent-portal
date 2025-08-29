import { Button } from "@nccl/components";
import { useNavigate, href, useSearchParams } from "react-router";

import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";

import { PageHeader } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";
import { EmptyState } from "../../components/states/EmptyState";

export default function AuthResetPasswordSuccess() {
  const [urlSearchParams] = useSearchParams();
  const navigate = useNavigate();
  return (
    <>
      <title>{assembleTitle("OAuth Error")}</title>
      <AuthPage>
        <AuthPageHeader>
          <PageHeader
            dxTitle="Uh oh."
            dxSubtitle="There was an issue signing in with your selected provider."
          />
        </AuthPageHeader>
        <AuthPageBody>
          <EmptyState
            imgSrc="/images/image-icon-do-not-enter.png"
            imgAlt="alert"
            borderless
            title={urlSearchParams.get("error") ?? "Unknown error"}
          >
            You either have not been invited, you have not accepted your invite
            or there was an error during the social login process. If you feel
            that it was the former, please reach out to the administrator.
          </EmptyState>
        </AuthPageBody>
        <AuthPageFooter>
          <Button
            dxVariant="outlined"
            dxColor="secondary"
            dxSize="lg"
            onClick={() => navigate(href("/sign-in"))}
          >
            Back to sign in
          </Button>
        </AuthPageFooter>
      </AuthPage>
    </>
  );
}
