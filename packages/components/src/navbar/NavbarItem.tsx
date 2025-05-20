import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import React, { forwardRef } from "react";

export type NavbarItemPropsNative = JSX.IntrinsicElements["a"];
// export type NavbarItemPropsCustom = {};
export type NavbarItemProps = NavbarItemPropsNative;

const styles = css`
  width: ${makeRem(74)};
  display: flex;
  align-items: center;
  flex-direction: column;

  &.active {
    color: ${makeColor("secondary-1200")};
  }
`;

export const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  function NavbarItem({ children, className, ...restProps }, ref) {
    return (
      <a {...restProps} className={classes(className, styles)} ref={ref}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<HTMLElement>(child)) return null;
          return React.cloneElement(child, {
            className,
          });
        })}
      </a>
    );
  }
);
