import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { makeFontWeight } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

export type NavbarSecondaryItemTextPropsNative = Omit<
  JSX.IntrinsicElements["div"],
  "children"
>;
export type NavbarSecondaryItemTextPropsCustom = {
  children: string;
};
export type NavbarSecondaryItemTextProps = NavbarSecondaryItemTextPropsNative &
  NavbarSecondaryItemTextPropsCustom;

const styles = css`
  color: inherit;

  &.active {
    font-weight: ${makeFontWeight("body-bold")};
  }
`;

export const NavbarSecondaryItemText = forwardRef<
  HTMLDivElement,
  NavbarSecondaryItemTextProps
>(function NavbarSecondaryItemText({ children, className, ...restProps }, ref) {
  return (
    <Typography
      dxVariant="body1"
      dxNode="div"
      {...restProps}
      className={classes(className, styles)}
      ref={ref}
    >
      {children}
    </Typography>
  );
});
