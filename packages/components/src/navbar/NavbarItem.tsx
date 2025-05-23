import { css } from "@linaria/core";
import { makeColor, makeCustom, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import React, { forwardRef } from "react";

export type NavbarItemPropsNative = JSX.IntrinsicElements["div"];
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
  height: ${makeCustom("navbar--height-mobile")};
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${makeColor("neutral-light-900")};

  &.active {
    color: ${makeColor("primary-1100")};
  }

  ${makeResponsive({ from: "laptop" })} {
    &:hover {
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      color: ${makeColor("primary-1100")};
    }
  }
`;

export const NavbarItem = forwardRef<HTMLDivElement, NavbarItemProps>(
  function NavbarItem(
    { children, className, dxIsActive = false, ...restProps },
    ref
  ) {
    return (
      <div
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
      </div>
    );
  }
);
