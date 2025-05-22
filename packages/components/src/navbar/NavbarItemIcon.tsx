import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useMemo } from "react";

import type { IconNames } from "../icons/Icon.js";
import { Icon } from "../icons/Icon.js";

export type NavbarItemIconPropsNative = Omit<
  JSX.IntrinsicElements["div"],
  "children"
>;
export type NavbarItemIconPropsCustom = {
  dxBaseIcon: IconNames;
  dxActiveIcon: IconNames;
};
export type NavbarItemIconProps = NavbarItemIconPropsNative &
  NavbarItemIconPropsCustom;

const styles = css`
  width: ${makeRem(24)};
  aspect-ratio: 1 / 1;
  font-size: ${makeRem(24)};
  position: relative;
  display: grid;
  place-content: center;

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      transform: scale(1.4);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .nav-icon {
    font-size: ${makeRem(24)};
    width: ${makeRem(24)};
    aspect-ratio: 1 / 1;
    position: absolute;
    display: grid;
    align-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    &.off {
      display: block;
      transform: scale(1);
    }
    &.on {
      display: none;
      transform: scale(1);
    }
  }

  &.active {
    .nav-icon {
      &.off {
        display: none;
        transform: 1;
      }
      &.on {
        display: block;
        animation: pulse 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        animation-fill-mode: both; /* keep final state */
      }
    }
  }
`;

export const NavbarItemIcon = forwardRef<HTMLDivElement, NavbarItemIconProps>(
  function NavbarItemIcon(
    { className, dxActiveIcon, dxBaseIcon, ...restProps },
    ref
  ) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        {useMemo(
          () => (
            <>
              <Icon dxIcon={dxBaseIcon} className="nav-icon off" />
              <Icon dxIcon={dxActiveIcon} className="nav-icon on" />
            </>
          ),
          [dxActiveIcon, dxBaseIcon]
        )}
      </div>
    );
  }
);
