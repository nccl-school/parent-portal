import { css } from "@linaria/core";
import { Button, Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX, MouseEventHandler } from "react";

const stylesBase = css`
  margin-bottom: ${makeRem(24)};
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: ${makeRem(16)};
`;

export type AccountPageSectionHeaderProps = JSX.IntrinsicElements["h3"] & {
  dxTitle: string;
  dxSubtitle: string;
  dxOnClick?: MouseEventHandler<HTMLButtonElement>;
};

export function AccountPageSectionHeader({
  className,
  dxTitle,
  dxSubtitle,
  dxOnClick,
  ...restProps
}: AccountPageSectionHeaderProps) {
  return (
    <header className={classes(stylesBase, className)}>
      <div>
        <Typography dxVariant="heading4" dxNode="h3" {...restProps}>
          {dxTitle}
        </Typography>
        <Typography dxVariant="body3" dxNode="div">
          {dxSubtitle}
        </Typography>
      </div>
      {dxOnClick ? (
        <Button dxVariant="outlined" dxColor="alt" dxSize="sm">
          Edit
        </Button>
      ) : (
        <div />
      )}
    </header>
  );
}
