import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const stylesBase = css`
  margin-bottom: ${makeRem(24)};
`;

export type AccountPageSectionHeaderProps = JSX.IntrinsicElements["h3"] & {
  dxTitle: string;
  dxSubtitle: string;
};

export function AccountPageSectionHeader({
  children,
  className,
  dxTitle,
  dxSubtitle,
  ...restProps
}: AccountPageSectionHeaderProps) {
  return (
    <header className={classes(stylesBase, className)}>
      <Typography dxVariant="heading5" dxNode="h3" {...restProps}>
        {dxTitle}
      </Typography>
      <Typography dxVariant="body3" dxNode="div">
        {dxSubtitle}
      </Typography>
    </header>
  );
}
