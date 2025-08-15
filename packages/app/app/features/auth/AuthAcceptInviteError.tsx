import type { ReactNode } from "react";

import { EmptyState } from "../../components/states/EmptyState";

export function AuthAcceptInviteError({ children }: { children: ReactNode }) {
  return (
    <>
      <EmptyState
        imgSrc="/images/image-icon-confused-monkey.png"
        imgAlt="alert"
        borderless
        title="Looks like there's a problem with your invite"
        imgSize={180}
      >
        There seems to be something wrong with the invite that you have been
        sent. If you think that this is an error, please contact the
        administrator.
        <br />
        <br />
        {children}
      </EmptyState>
    </>
  );
}
