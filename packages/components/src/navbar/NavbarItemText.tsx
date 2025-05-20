import { css } from "@linaria/core";
import { makeFontFamily, makeFontWeight, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type NavbarItemTextPropsNative = JSX.IntrinsicElements["div"];
// export type NavbarItemTextPropsCustom = {};
export type NavbarItemTextProps = NavbarItemTextPropsNative;

const styles = css`
  font-size: ${makeRem(10)};
  text-align: center;
  width: 100%;
  margin-top: ${makeRem(4)};
  font-family: ${makeFontFamily("body")};
  transition: all 0.1s ease-in-out;

  &.active {
    font-weight: ${makeFontWeight("body-bold")};
  }
`;

export const NavbarItemText = forwardRef<HTMLDivElement, NavbarItemTextProps>(
  function NavbarItemText({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </div>
    );
  }
);
