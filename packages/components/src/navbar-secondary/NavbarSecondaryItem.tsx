import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import React, { forwardRef } from "react";

export type NavbarSecondaryItemPropsNative = JSX.IntrinsicElements["div"];
export type NavbarSecondaryItemPropsCustom = {
  /**
   * Toggles the active style on and off
   * @default false
   */
  dxIsActive?: boolean;
};
export type NavbarSecondaryItemProps = NavbarSecondaryItemPropsNative &
  NavbarSecondaryItemPropsCustom;

const styles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${makeRem(8)};
  height: ${makeRem(36)};
  align-items: center;
  color: ${makeColor("neutral-dark-200")};
  transition: all 0.15s ease-in-out;

  &.active {
    color: ${makeColor("primary-1100")};
    background: ${makeColor("primary-100", { opacity: 0.3 })};
    border-radius: ${makeRem(8)};
  }

  ${makeResponsive({ from: "laptop" })} {
    &:hover {
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      color: ${makeColor("primary-1100")};
    }
  }
`;

export const NavbarSecondaryItem = forwardRef<
  HTMLDivElement,
  NavbarSecondaryItemProps
>(function NavbarSecondaryItem(
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
});
