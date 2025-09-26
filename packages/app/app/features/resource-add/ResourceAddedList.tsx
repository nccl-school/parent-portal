import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  ${makeReset("ul")}
  display: flex;
  flex-direction: column;
  gap: ${makeRem(16)};
`;

export function ResourceAddedList({ children }: { children: ReactNode }) {
  return <ul className={styles}>{children}</ul>;
}
