import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import {
  makeColor,
  makeFontFamily,
  makeFontWeight,
  makeRem,
} from "@nccl/theme";
import { css } from "@linaria/core";

import type { InputLabelSharedProps } from "./input-label.utils.js";

export type InputLabelContentPropsNative = JSX.IntrinsicElements["div"];
export type InputLabelContentProps = InputLabelContentPropsNative &
  InputLabelSharedProps;

const styles = css`
  font-family: ${makeFontFamily("body")};
  font-weight: ${makeFontWeight("body-semiBold")};
  display: ${makeColor("neutral-light-900")};
  color: inherit;
  transition: all 0.15s ease-in-out;
  padding-bottom: ${makeRem(4)};
  font-size: ${makeRem(14)};

  .hint {
    font-size: 0.9em;
    font-weight: ${makeFontWeight("body-regular")};
  }
`;

export const InputLabelContent = forwardRef<
  HTMLDivElement,
  InputLabelContentProps
>(function InputLabelContent(
  { dxLabel, dxHint, className, ...restProps },
  ref
) {
  return (
    <div {...restProps} className={classes(className, styles)} ref={ref}>
      {dxLabel && <div className="label">{dxLabel}</div>}
      {dxHint && <div className="hint">{dxHint}</div>}
    </div>
  );
});
