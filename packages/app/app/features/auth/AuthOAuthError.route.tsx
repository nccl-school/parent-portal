import { Button, Callout, Typography } from "@nccl/components";
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
          />
          <Typography dxNode="div" dxVariant="body1">
            This could be for one of many reasons
            <ul>
              <li>You have not been invited to the platform</li>
              <li>
                You have been invited but you have not accepted your invite
                which was sent to your inbox
              </li>
              <li>
                You're attempting to accept your invite but it has expired
              </li>
              <li>
                You tried to sign in with an using an email that wasn't
                explicitly invited.
              </li>
            </ul>
            Either way, click on the button below and try again.
          </Typography>
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
