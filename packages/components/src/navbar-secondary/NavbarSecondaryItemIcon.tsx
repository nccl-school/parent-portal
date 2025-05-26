import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useMemo } from "react";

import type { IconNames } from "../icons/Icon.js";
import { Icon } from "../icons/Icon.js";

export type NavbarSecondaryItemIconPropsNative = Omit<
  JSX.IntrinsicElements["div"],
  "children"
>;
export type NavbarSecondaryItemIconPropsCustom = {
  dxBaseIcon: IconNames;
  dxActiveIcon: IconNames;
};
export type NavbarSecondaryItemIconProps = NavbarSecondaryItemIconPropsNative &
  NavbarSecondaryItemIconPropsCustom;

const styles = css`
  width: ${makeRem(32)};
  aspect-ratio: 1 / 1;
  font-size: ${makeRem(24)};
  position: relative;
  display: grid;
  place-content: center;

  .nav-icon {
    font-size: ${makeRem(24)};
    display: grid;
    align-content: center;

    &.off {
      display: block;
    }
    &.on {
      display: none;
    }
  }

  &.active {
    .nav-icon {
      &.off {
        display: none;
      }
      &.on {
        display: block;
      }
    }
  }
`;

export const NavbarSecondaryItemIcon = forwardRef<
  HTMLDivElement,
  NavbarSecondaryItemIconProps
>(function NavbarSecondaryItemIcon(
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
});
