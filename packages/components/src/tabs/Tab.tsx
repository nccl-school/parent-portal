import { css } from "@linaria/core";
import { makeColor, makeFontWeight, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

import { Typography } from "../typography/Typography.js";

export type TabPropsNative = JSX.IntrinsicElements["div"];
export type TabPropsCustom = { dxActive?: boolean };
export type TabProps = TabPropsNative & TabPropsCustom;

const styles = css`
  padding: ${makeRem(8)} ${makeRem(16)};
  transition: all 0.15s ease-in-out;
  color: ${makeColor("neutral-light-600")};
  font-weight: ${makeFontWeight("body-bold")} !important;

  &:hover {
    cursor: pointer;
    &:not(.selected) {
      color: ${makeColor("neutral-dark-600")};
    }
  }

  &.selected {
    color: ${makeColor("secondary-1100")};
  }
`;

export const Tab = forwardRef<HTMLDivElement, TabProps>(function Tab(
  { children, className, dxActive = false, ...restProps },
  ref
) {
  return (
    <Typography
      dxNode="div"
      dxVariant="body1"
      {...restProps}
      className={classes(className, styles, { selected: dxActive })}
      ref={ref}
    >
      {children}
    </Typography>
  );
});
