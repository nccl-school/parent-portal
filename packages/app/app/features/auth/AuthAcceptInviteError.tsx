import type { ReactNode } from "react";

import { AuthPage } from "./AuthPage";
import { AuthPageHeader } from "./AuthPageHeader";
import { AuthPageBody } from "./AuthPageBody";
import { AuthPageFooter } from "./AuthPageFooter";

import { PageHeader } from "../../components/page";
import { EmptyState } from "../../components/states/EmptyState";

export function AuthAcceptInviteError({ children }: { children: ReactNode }) {
  return (
    <AuthPage>
      <AuthPageHeader>
        <PageHeader
          dxTitle="Uh oh."
          dxSubtitle="There was an issue with validating your invite."
        />
      </AuthPageHeader>
      <AuthPageBody>
        <EmptyState
          imgSrc="/images/image-icon-confused-monkey.png"
          imgAlt="alert"
          borderless
          title="Invalid invitation"
        >
          If you think that this is an error, please contact the administrator.
          <br />
          <br />
          {children}
        </EmptyState>
      </AuthPageBody>
      <AuthPageFooter>
        <div />
      </AuthPageFooter>
    </AuthPage>
  );
}
