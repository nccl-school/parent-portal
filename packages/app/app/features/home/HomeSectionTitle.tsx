import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css`
  display: grid;
  grid-template-columns: ${makeRem(32)} 1fr auto;
  grid-template-rows: ${makeRem(32)};
  gap: ${makeRem(8)};
  align-items: center;
  margin-bottom: ${makeRem(16)};

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
  }
`;

export type HomeSectionTitleProps = JSX.IntrinsicElements["header"] & {
  dxTitle: string;
  dxTitleImg: string;
  dxTitleImgAlt: string;
};

export function HomeSectionTitle({
  className,
  children,
  dxTitle,
  dxTitleImg,
  dxTitleImgAlt,
  ...restProps
}: HomeSectionTitleProps) {
  return (
    <header {...restProps} className={classes(styles, className)}>
      <img src={dxTitleImg} alt={dxTitleImgAlt} />
      <Typography dxVariant="heading4" dxNode="h2">
        {dxTitle}
      </Typography>
      <div>{children}</div>
    </header>
  );
}
