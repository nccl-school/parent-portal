import { css } from "@linaria/core";
import { Icon, Typography, type IconNames } from "@nccl/components";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import type { JSX } from "react";

export type NavItemPropsCustom = {
  dxBaseIcon: IconNames;
  dxActiveIcon: IconNames;
  isActive?: boolean;
  children: string;
};

const stylesBase = css`
  ${makeResponsive({ to: "laptop" })} {
    height: ${makeRem(60)};
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: ${makeRem(16)};
    border-bottom: 1px solid ${makeColor("light-400")};
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
    <div className={stylesBase} {...restProps}>
      <Icon dxIcon={isActive ? dxActiveIcon : dxBaseIcon} dxSize={24} />
      <Typography dxNode="div" dxVariant="body3">
        {children}
      </Typography>
      <Icon
        dxIcon="arrow-right-01-stroke-standard"
        dxSize={24}
        dxColor="neutral-dark-200"
      />
    </div>
  );
}
