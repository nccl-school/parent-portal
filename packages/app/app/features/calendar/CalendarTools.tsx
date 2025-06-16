import { css } from "@linaria/core";
import { makeCustom, makeRem } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${makeRem(32)} ${makeCustom("page--gutter-desktop")};
`;

export function CalendarTools({ children }: { children: ReactNode }) {
  return <div className={styles}>{children}</div>;
}
