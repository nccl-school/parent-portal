import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

export type LabelGroupPropsNative = JSX.IntrinsicElements["div"];
export type LabelGroupProps = LabelGroupPropsNative;

const styles = css`
  display: flex;
  gap: ${makeRem(8)};
  flex-wrap: wrap;
`;

export const LabelGroup = forwardRef<HTMLDivElement, LabelGroupProps>(
  function LabelGroup({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </div>
    );
  }
);
