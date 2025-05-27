import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { makeColor, makeFontWeight, makeRem, makeReset } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

export type NavbarSecondaryGroupPropsNative = JSX.IntrinsicElements["ul"];
export type NavbarSecondaryGroupPropsCustom = {
  dxTitle: string;
};
export type NavbarSecondaryGroupProps = NavbarSecondaryGroupPropsNative &
  NavbarSecondaryGroupPropsCustom;

const styles = css`
  padding: ${makeRem(24)};
  padding-bottom: 0;

  .navbar-head {
    text-transform: uppercase;
    font-weight: ${makeFontWeight("body-bold")};
    font-size: ${makeRem(12)};
    line-height: ${makeRem(32)};
    color: ${makeColor("neutral-light-900")};
  }

  a {
    text-decoration: none;
  }

  ul {
    ${makeReset("ul")};
    height: 100%;
  }
`;

export const NavbarSecondaryGroup = forwardRef<
  HTMLUListElement,
  NavbarSecondaryGroupProps
>(function NavbarSecondaryGroup(
  { children, className, dxTitle, ...restProps },
  ref
) {
  return (
    <div className={styles}>
      <Typography dxVariant="body2" dxNode="div" className="navbar-head">
        {dxTitle}
      </Typography>
      <ul {...restProps} className={classes(className)} ref={ref}>
        {children}
      </ul>
    </div>
  );
});
