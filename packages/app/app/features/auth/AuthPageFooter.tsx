import { css } from "@linaria/core";
import type { ReactNode } from "react";

const styles = css`
  & > * {
    width: 100%;
  }
  button {
    justify-content: center;
  }
`;

export function AuthPageFooter({ children }: { children: ReactNode }) {
  return <footer className={styles}>{children}</footer>;
}
