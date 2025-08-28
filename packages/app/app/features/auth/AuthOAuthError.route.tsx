import { Button, Callout, Typography } from "@nccl/components";
import { useNavigate, href, useSearchParams } from "react-router";

import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";

import { PageHeader } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";

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
          <Callout
            variant="danger"
            omitIcon
            description={urlSearchParams.get("error") ?? "Unknown error"}
          />
          <br />
          <Typography dxNode="p" dxVariant="body1">
            Try signing in again. If the issue continues contact support.
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
