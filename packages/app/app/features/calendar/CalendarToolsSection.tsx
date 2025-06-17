import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  display: flex;
  align-items: center;
  gap: ${makeRem(16)};

  & > & + & {
    border-left: 1px solid ${makeColor("neutral-light-200")};
    padding-left: ${makeRem(16)};
  }
`;

export function CalendarToolsSection({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
