import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type InputGroupPropsNative = JSX.IntrinsicElements["div"];
export type InputGroupPropsCustom = {
  /**
   * The layout of the inputs
   * @default stacked
   */
  dxLayout?: "inline" | "inline-stretch" | "stacked";
};
export type InputGroupProps = InputGroupPropsNative & InputGroupPropsCustom;

const styles = css`
  gap: ${makeRem(16)};
  display: flex;

  & + & {
    margin-top: ${makeRem(16)};
  }

  &.inline-stretch {
    & > * {
      flex: 1;
      width: 100%;
      height: 100%;
    }
  }

  &.stacked {
    flex-direction: column;
    width: 100%;
  }
`;

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroup(
    { children, className, dxLayout = "stacked", ...restProps },
    ref
  ) {
    return (
      <div
        {...restProps}
        className={classes(className, styles, dxLayout)}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
