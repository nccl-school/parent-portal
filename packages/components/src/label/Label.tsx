import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

import { Typography } from "../typography/Typography.js";

export type LabelVariants =
  | "primary"
  | "secondary"
  | "warning"
  | "tertiary"
  | "info"
  | "alt"
  | "success";

export type LabelPropsNative = Omit<JSX.IntrinsicElements["span"], "children">;
export type LabelPropsCustom = {
  children: string | number;
  dxVariant: LabelVariants;
};
export type LabelProps = LabelPropsNative & LabelPropsCustom;

const styles = css`
  padding: 0 ${makeRem(8)};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: ${makeRem(20)};
  border-width: 0.5px;
  border-style: solid;
  border-radius: ${makeRem(12)};

  &.primary {
    border-color: ${makeColor("primary-800")};
    background-color: ${makeColor("primary-100")};
    color: ${makeColor("primary-1100")};
  }
  &.secondary {
    border-color: ${makeColor("secondary-800")};
    background-color: ${makeColor("secondary-100")};
    color: ${makeColor("secondary-1100")};
  }
  &.tertiary {
    border-color: ${makeColor("tertiary-800")};
    background-color: ${makeColor("tertiary-100")};
    color: ${makeColor("tertiary-1100")};
  }
  &.alt {
    border-color: ${makeColor("alt-800")};
    background-color: ${makeColor("alt-100")};
    color: ${makeColor("alt-900")};
  }
  &.success {
    border-color: ${makeColor("success-800")};
    background-color: ${makeColor("success-100")};
    color: ${makeColor("success-900")};
  }
  &.warning {
    border-color: ${makeColor("warning-800")};
    background-color: ${makeColor("warning-100")};
    color: ${makeColor("warning-900")};
  }
  &.danger {
    border-color: ${makeColor("danger-800")};
    background-color: ${makeColor("danger-100")};
    color: ${makeColor("danger-900")};
  }
  &.info {
    border-color: ${makeColor("neutral-light-800")};
    background-color: ${makeColor("neutral-light-100")};
    color: ${makeColor("neutral-light-1000")};
  }
`;

export const Label = forwardRef<HTMLDivElement, LabelProps>(function Label(
  { children, className, dxVariant, ...restProps },
  ref
) {
  return (
    <Typography
      {...restProps}
      ref={ref}
      dxVariant="caption"
      dxNode="div"
      className={classes(className, styles, dxVariant)}
    >
      {children}
    </Typography>
  );
});
