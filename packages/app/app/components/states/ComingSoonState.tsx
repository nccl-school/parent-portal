import type { ReactNode } from "react";

import { EmptyState } from "./EmptyState";

export function ComingSoonState({ children }: { children: ReactNode }) {
  return (
    <EmptyState
      title="Coming soon!"
      imgAlt="sunrise"
      imgSrc="/images/image-icon-sunrise.png"
      imgSize={160}
      borderless
    >
      {children}
    </EmptyState>
  );
}
