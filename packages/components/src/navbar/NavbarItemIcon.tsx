import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

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

    &.base {
      visibility: visible;
    }
    &.active {
      visibility: hidden;
    }
  }

  &.active {
    .nav-icon {
      &.base {
        visibility: hidden;
      }
      &.active {
        visibility: visible;
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
        <Icon dxIcon={dxBaseIcon} className="nav-icon base" />
        <Icon dxIcon={dxActiveIcon} className="nav-icon active" />
      </div>
    );
  }
);
