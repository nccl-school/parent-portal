import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type WidgetBodyPropsNative = JSX.IntrinsicElements["div"];
export type WidgetBodyPropsCustom = {
  dxNoGutters?: boolean;
};
export type WidgetBodyProps = WidgetBodyPropsNative & WidgetBodyPropsCustom;

const styles = css`
  &:not(.flush) {
    padding: ${makeRem(8)} ${makeRem(24)};
  }

  p {
    margin-block-end: 1em;
  }
`;

export const WidgetBody = forwardRef<HTMLDivElement, WidgetBodyProps>(
  function WidgetBody(
    { children, className, dxNoGutters = false, ...restProps },
    ref
  ) {
    return (
      <div
        {...restProps}
        className={classes(styles, className, { flush: dxNoGutters })}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
