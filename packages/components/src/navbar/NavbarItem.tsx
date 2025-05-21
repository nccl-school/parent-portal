import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import React, { forwardRef } from "react";

export type NavbarItemPropsNative = JSX.IntrinsicElements["a"];
export type NavbarItemPropsCustom = {
  /**
   * Toggles the active style on and off
   * @default false
   */
  dxIsActive?: boolean;
};
export type NavbarItemProps = NavbarItemPropsNative & NavbarItemPropsCustom;

const styles = css`
  width: 100%;
  height: ${makeRem(60)};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &.active {
    color: ${makeColor("secondary-1200")};
  }
`;

export const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  function NavbarItem(
    { children, className, dxIsActive = false, ...restProps },
    ref
  ) {
    return (
      <a
        {...restProps}
        className={classes(className, styles, { active: dxIsActive })}
        ref={ref}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<HTMLElement>(child)) return null;
          return React.cloneElement(child, {
            className: classes(className, { active: dxIsActive }),
          });
        })}
      </a>
    );
  }
);
