import { css } from "@linaria/core";
import { makeColor, makeFontFamily, makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useId, useMemo } from "react";

import {
  InputContainer,
  type InputContainerPropsCustom,
} from "../InputContainer/InputContainer.js";

export type InputTextPropsNative = JSX.IntrinsicElements["input"];
export type InputTextPropsCustom = Omit<
  InputContainerPropsCustom,
  "dxInputId"
> & {
  /**
   * The pre-defined style of the input
   * @default "transparent"
   */
  dxVariant?: "transparent" | "contrasted";
};
export type InputTextProps = InputTextPropsNative & InputTextPropsCustom;

const styles = css`
  ${makeReset("input")};
  padding: 0.5em 1em;
  border-radius: ${makeRem(4)};
  font-family: ${makeFontFamily("body")};
  color: var(--input-color);
  width: 100%;
  transition: all 0.15s ease-in-out;
  height: 100%;

  &.transparent {
    border: 1px solid ${makeColor("neutral-light-300")};
    background: transparent;
  }

  &.contrasted {
    border: 1px solid transparent;
    background: ${makeColor("neutral-light-100", { opacity: 0.4 })};
  }
`;

export function getInputStyles({
  className,
  dxError,
  dxVariant = "transparent",
}: Pick<InputTextPropsCustom, "dxVariant" | "dxError"> & {
  className?: string;
}): string {
  return classes(className, "field", styles, dxVariant, {
    invalid: !!dxError,
  });
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(
    {
      className,
      dxVariant,
      dxSize = "md",
      dxLabel,
      type = "text",
      dxHint,
      dxError,
      id,
      DXAdornmentEnd,
      DXAdornmentStart,
      ...restProps
    },
    ref
  ) {
    const autoId = useId();
    const inputId = useMemo(() => id ?? autoId, [autoId, id]);

    return (
      <InputContainer
        dxLabel={dxLabel}
        dxHint={dxHint}
        dxSize={dxSize}
        dxError={dxError}
        dxInputId={inputId}
        DXAdornmentStart={DXAdornmentStart}
        DXAdornmentEnd={DXAdornmentEnd}
      >
        <input
          {...restProps}
          type={type}
          id={inputId}
          className={getInputStyles({ className, dxError, dxVariant })}
          ref={ref}
        />
      </InputContainer>
    );
  }
);
