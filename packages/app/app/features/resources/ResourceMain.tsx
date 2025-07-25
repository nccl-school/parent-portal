import { css } from "@linaria/core";
import { makeColor } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  overflow: auto;
  background: ${makeColor("white")};
  min-height: 100%;
`;

export function ResourceMain({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
