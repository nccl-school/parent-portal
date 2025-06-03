import type { ForwardedRef, JSX } from "react";
import { forwardRef } from "react";

import type { InputLabelSharedProps } from "./input-label.utils.js";
import {
  InputLabelContent,
  type InputLabelContentProps,
} from "./InputLabelContent.js";

type InputLabelDivProps = {
  dxNode: "div";
} & InputLabelContentProps;

type InputLabelLabelProps = InputLabelSharedProps & {
  dxNode: "label";
} & JSX.IntrinsicElements["label"];

export type InputLabelProps = InputLabelLabelProps | InputLabelDivProps;

export const InputLabel = forwardRef<HTMLElement, InputLabelProps>(
  function InputLabel(props, ref) {
    switch (props.dxNode) {
      case "div": {
        const { dxNode: _, children, ...restProps } = props;
        return (
          <>
            <InputLabelContent
              {...restProps}
              ref={ref as ForwardedRef<HTMLDivElement>}
            />
            {children}
          </>
        );
      }

      case "label": {
        const { dxNode: _, dxLabel, dxHint, children, ...restProps } = props;
        return (
          <label {...restProps} ref={ref as ForwardedRef<HTMLLabelElement>}>
            <InputLabelContent dxLabel={dxLabel} dxHint={dxHint} />
            {children}
          </label>
        );
      }

      default:
        break;
    }
  }
);
