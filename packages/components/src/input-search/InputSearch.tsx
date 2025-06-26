import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";

import type { InputTextProps } from "../input-text/InputText.js";
import { InputText } from "../input-text/InputText.js";
import { Icon } from "../icons/Icon.js";

export type InputSearchPropsNative = Omit<
  JSX.IntrinsicElements["input"],
  "type"
>;
export type InputSearchPropsCustom = Omit<
  InputTextProps,
  "DXAdornmentStart" | "DXAdornmentEnd"
>;
export type InputSearchProps = InputSearchPropsNative & InputSearchPropsCustom;

function AdornmentStart() {
  return <Icon dxIcon="search-01-stroke-standard" dxSize={18} />;
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  function InputSearch({ children, className, ...restProps }, ref) {
    return (
      <InputText
        type="search"
        {...restProps}
        DXAdornmentStart={AdornmentStart}
        className={classes(className)}
        ref={ref}
      >
        {children}
      </InputText>
    );
  }
);
