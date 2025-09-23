import type { ReactNode } from "react";
import { css } from "@linaria/core";
import { makeFontWeight } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

const styles = css`
  white-space: nowrap;
  text-decoration: none;
  font-weight: ${makeFontWeight("body-semiBold")};
`;

export function PopoverMenuItemText({ children }: { children: ReactNode }) {
  return (
    <Typography dxNode="div" dxVariant="body3" className={styles}>
      {children}
    </Typography>
  );
}
