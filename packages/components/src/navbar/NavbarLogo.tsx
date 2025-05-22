import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { makeCustom, makeResponsive } from "@nccl/theme";

export type NavbarLogoPropsNative = JSX.IntrinsicElements["li"];
export type NavbarLogoPropsCustom = {
  dxSrc: string;
  dxAlt: string;
};
export type NavbarLogoProps = NavbarLogoPropsNative & NavbarLogoPropsCustom;

const styles = css`
  width: ${makeCustom("navbar--width-desktop")};
  vertical-align: middle;
  aspect-ratio: 1 / 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: none;

  img {
    object-fit: contain;
    object-position: center;
    width: 50%;
  }

  ${makeResponsive({ from: "laptop" })} {
    display: flex;
  }
`;

export const NavbarLogo = forwardRef<HTMLLIElement, NavbarLogoProps>(
  function NavbarLogo(
    { children, className, dxAlt, dxSrc, ...restProps },
    ref
  ) {
    return (
      <li {...restProps} className={classes(className, styles)} ref={ref}>
        <img alt={dxAlt} src={dxSrc}>
          {children}
        </img>
      </li>
    );
  }
);
