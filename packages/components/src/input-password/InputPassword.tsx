import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";

import type { InputTextProps } from "../input-text/InputText.js";
import { InputText } from "../input-text/InputText.js";
import { Icon } from "../icons/Icon.js";

export type InputPasswordPropsNative = Omit<
  JSX.IntrinsicElements["input"],
  "type"
>;
export type InputPasswordPropsCustom = Omit<
  InputTextProps,
  "DXAdornmentStart" | "DXAdornmentEnd"
>;
export type InputPasswordProps = InputPasswordPropsNative &
  InputPasswordPropsCustom;

function AdornmentStart() {
  return <Icon dxIcon="lock-password-stroke-standard" dxSize={18} />;
}

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  function InputPassword({ children, className, ...restProps }, ref) {
    return (
      <InputText
        type="password"
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
