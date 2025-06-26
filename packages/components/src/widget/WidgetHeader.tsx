import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { makeFontWeight, makeRem } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

export type WidgetHeaderPropsNative = JSX.IntrinsicElements["header"];
export type WidgetHeaderPropsCustom = {
  dxTitle: string;
  dxSubtitle?: string;
  dxImageSrc?: string;
  dxImageAlt?: string;
};
export type WidgetHeaderProps = WidgetHeaderPropsNative &
  WidgetHeaderPropsCustom;

const styles = css`
  display: flex;
  align-items: center;
  padding: 0 ${makeRem(24)};
  min-height: ${makeRem(60)};
`;

const imgStyles = css`
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  height: ${makeRem(60)};

  img {
    height: 80%;
    object-fit: contain;
  }
`;

const titleStyles = css`
  width: 100%;
  flex: 1;

  h4 {
    font-weight: ${makeFontWeight("heading-semiBold")} !important;
  }
  .subtitle {
    font-size: ${makeRem(14)};
  }
`;

export const WidgetHeader = forwardRef<HTMLElement, WidgetHeaderProps>(
  function WidgetHeader(
    {
      children,
      className,
      dxImageAlt,
      dxImageSrc,
      dxTitle,
      dxSubtitle,
      ...restProps
    },
    ref
  ) {
    return (
      <header {...restProps} className={classes(styles, className)} ref={ref}>
        <div className={imgStyles}>
          {dxImageSrc && dxImageAlt && (
            <img src={dxImageSrc} alt={dxImageAlt} />
          )}
        </div>
        <div className={titleStyles}>
          <Typography dxNode="h4" dxVariant="heading4">
            {dxTitle}
          </Typography>
          {dxSubtitle && (
            <Typography dxNode="div" dxVariant="body2" className="subtitle">
              {dxSubtitle}
            </Typography>
          )}
        </div>
        {children}
      </header>
    );
  }
);
