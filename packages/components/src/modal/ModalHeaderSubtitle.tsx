import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import { Typography } from "../typography/Typography.js";

export type ModalHeaderSubtitlePropsNative = JSX.IntrinsicElements["div"];
export type ModalHeaderSubtitlePropsCustom = {
  children: string;
};
export type ModalHeaderSubtitleProps = ModalHeaderSubtitlePropsNative &
  ModalHeaderSubtitlePropsCustom;

const styles = css`
  && {
    color: ${makeColor("neutral-light-1200")};
    margin-top: ${makeRem(4)};
    line-height: 1.3;
  }
`;

export const ModalHeaderSubtitle = forwardRef<
  HTMLDivElement,
  ModalHeaderSubtitleProps
>(function ModalHeaderSubtitle({ children, className, ...restProps }, ref) {
  return (
    <Typography
      dxVariant="body1"
      dxNode="div"
      {...restProps}
      ref={ref}
      className={classes(className, styles)}
    >
      {children}
    </Typography>
  );
});
