import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeCustom, makeRem, makeResponsive } from "@nccl/theme";

export type NavbarPropsNative = JSX.IntrinsicElements["nav"];
// export type NavbarPropsCustom = {};
export type NavbarProps = NavbarPropsNative;

const styles = css`
  ${makeResponsive({ to: "desktop" })} {
    height: ${makeCustom("navbar--height-mobile")};
    padding: 0 ${makeRem(8)};
    display: flex;
    position: sticky;
    justify-content: space-evenly;
    top: 100%;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.06);
    border-top: 1px solid ${makeColor("neutral-dark-50", { opacity: 0.1 })};
  }

  ${makeResponsive({ from: "desktop" })} {
  }
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
