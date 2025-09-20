import type { ReactNode } from "react";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

const styles = css`
  padding-right: ${makeRem(24)};
`;

export function PopoverMenuItemText({ children }: { children: ReactNode }) {
  return (
    <Typography dxNode="div" dxVariant="body3" className={styles}>
      {children}
    </Typography>
  );
}
