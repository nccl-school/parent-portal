import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem, makeResponsive, makeColor } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css`
  display: grid;
  grid-template-columns: ${makeRem(32)} 1fr auto;
  grid-template-rows: ${makeRem(32)};
  gap: ${makeRem(8)};
  align-items: center;
  padding: ${makeRem(16)};
  margin-bottom: ${makeRem(16)};
  border-bottom: 1px solid ${makeColor("light-300")};

  ${makeResponsive({ to: "laptop" })} {
    position: sticky;
    top: 0;
    background: inherit;
  }

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: contain;
  }

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: ${makeRem(4)};
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
