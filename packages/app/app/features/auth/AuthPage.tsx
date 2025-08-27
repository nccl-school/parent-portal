import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: ${makeRem(400)};
  gap: ${makeRem(32)};
`;

export function AuthPage({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
