import { css } from "@linaria/core";
import type { ReactNode } from "react";

const styles = css`
  & > * {
    padding: 0 !important;
  }
`;

export function AuthPageHeader({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
