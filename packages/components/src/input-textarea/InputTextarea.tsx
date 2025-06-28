import type { JSX } from "react";
import { forwardRef, useId } from "react";
import { css } from "@linaria/core";

import {
  getInputStyles,
  type InputTextPropsCustom,
} from "../input-text/InputText.js";
import { InputContainer } from "../InputContainer/InputContainer.js";

export type InputTextareaPropsNative = JSX.IntrinsicElements["textarea"];
export type InputTextareaPropsCustom = Pick<
  InputTextPropsCustom,
  "dxLabel" | "dxHint" | "dxError" | "dxSize" | "dxVariant"
>;
export type InputTextareaProps = InputTextareaPropsNative &
  InputTextareaPropsCustom;

const styles = css`
  resize: vertical;
`;

export const InputTextarea = forwardRef<
  HTMLTextAreaElement,
  InputTextareaProps
>(function InputTextarea(
  { children, id, dxError, dxHint, dxLabel, dxSize, dxVariant, ...restProps },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <InputContainer
      dxInputId={inputId}
      dxError={dxError}
      dxHint={dxHint}
      dxLabel={dxLabel}
      dxSize={dxSize}
    >
      <textarea
        {...restProps}
        id={inputId}
        className={getInputStyles({ dxError, dxVariant, className: styles })}
        ref={ref}
      >
        {children}
      </textarea>
    </InputContainer>
  );
});
