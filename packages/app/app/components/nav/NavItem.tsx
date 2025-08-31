import { css } from "@linaria/core";
import { Icon, Typography, type IconNames } from "@nccl/components";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import type { JSX } from "react";
import { classes } from "@stratum-ui/core/utils";

import { CLASSES } from "../../utils/isomorphic";

export type NavItemPropsCustom = {
  dxBaseIcon: IconNames;
  dxActiveIcon: IconNames;
  isActive?: boolean;
  children: string;
};

const stylesBase = css`
  display: grid;
  gap: ${makeRem(16)};
  align-items: center;

  ${makeResponsive({ to: "laptop" })} {
    height: ${makeRem(60)};
    display: grid;
    grid-template-columns: auto 1fr auto;
    border-bottom: 1px solid ${makeColor("light-400")};
  }

  ${makeResponsive({ from: "laptop" })} {
    grid-template-columns: auto 1fr;
    height: ${makeRem(44)};
    padding: 0 ${makeRem(16)};
    border-radius: ${makeRem(12)};
    margin-bottom: ${makeRem(4)};
    transition: all 0.1s ease-in-out;

    &.active {
      background: ${makeColor("secondary-400", { opacity: 0.2 })};
      color: ${makeColor("secondary-1200")} !important;
    }

    &:not(.active) {
      &:hover {
        background: ${makeColor("light-200", { opacity: 0.9 })};
        color: ${makeColor("neutral-dark-1200")};
      }
    }
  }
`;

export function NavItem({
  children,
  className,
  dxActiveIcon,
  dxBaseIcon,
  isActive = false,
  ...restProps
}: Omit<JSX.IntrinsicElements["div"], "children"> & NavItemPropsCustom) {
  return (
    <div className={classes(stylesBase, { active: isActive })} {...restProps}>
      <Icon dxIcon={isActive ? dxActiveIcon : dxBaseIcon} dxSize={24} />
      <Typography dxNode="div" dxVariant="body3">
        {children}
      </Typography>
      <Icon
        dxIcon="arrow-right-01-stroke-standard"
        dxSize={24}
        dxColor="neutral-dark-200"
        className={CLASSES.mobileOnly}
      />
    </div>
  );
}
