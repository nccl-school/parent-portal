import type { JSX } from "react";
import { forwardRef, useState } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeReset } from "@nccl/theme";

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

const styles = css`
  ${makeReset("button")};
  padding: 0 !important;
  width: inherit;
  aspect-ratio: 1 / 1;
  display: grid;
  place-content: center;
`;

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  function InputPassword({ children, className, ...restProps }, ref) {
    const [isPasswordPlainText, setIsPasswordPlainText] = useState(false);

    return (
      <InputText
        type={isPasswordPlainText ? "text" : "password"}
        {...restProps}
        DXAdornmentStart={AdornmentStart}
        DXAdornmentEnd={() => (
          <button
            className={styles}
            onClick={() => setIsPasswordPlainText((prevState) => !prevState)}
          >
            <Icon
              dxIcon={
                isPasswordPlainText
                  ? "view-off-slash-stroke-rounded"
                  : "view-stroke-rounded"
              }
              dxSize={18}
            />
          </button>
        )}
        className={classes(className)}
        ref={ref}
      >
        {children}
      </InputText>
    );
  }
);
