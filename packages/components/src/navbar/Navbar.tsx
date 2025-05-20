import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeCustom, makeRem } from "@nccl/theme";

export type NavbarPropsNative = JSX.IntrinsicElements["nav"];
// export type NavbarPropsCustom = {};
export type NavbarProps = NavbarPropsNative;

const styles = css`
  height: ${makeCustom("navbar--height-mobile")};
  padding: 0 ${makeRem(8)} ${makeRem(32)} ${makeRem(8)};
  display: flex;
  position: sticky;
  justify-content: center;
  top: 100%;
`;

export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { children, className, ...restProps },
  ref
) {
  return (
    <nav {...restProps} className={classes(className, styles)} ref={ref}>
      {children}
    </nav>
  );
});
