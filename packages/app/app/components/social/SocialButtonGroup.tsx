import { css } from "@linaria/core";
import type { ReactNode } from "react";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function SocialButtonGroup({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
