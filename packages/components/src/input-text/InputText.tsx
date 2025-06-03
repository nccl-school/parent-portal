import { css } from "@linaria/core";
import {
  makeColor,
  makeFontFamily,
  makeFontWeight,
  makeRem,
  makeReset,
} from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useId, useMemo } from "react";

import { fontSizeStyles, type IntrinsicSizes } from "../shared/index.js";
import { InputLabelContent } from "../input-label/InputLabelContent.js";

export type InputTextPropsNative = JSX.IntrinsicElements["input"];
export type InputTextPropsCustom = {
  /**
   * The pre-defined style of the input
   * @default "transparent"
   */
  dxVariant?: "transparent" | "contrasted";
  /**
   * The size of the input
   * @default "md"
   */
  dxSize?: IntrinsicSizes;
  /**
   * Adds a label above the input
   */
  dxLabel?: string;
  /**
   * Shows a hint underneath the label
   */
  dxHint?: string;
  /**
   * Shows an error and sets the input in an invalid state
   */
  dxError?: string;
  /**
   * Any function that returns JSX to be at the start of the input
   */
  DXAdornmentStart?: () => JSX.Element;
  /**
   * Any function that returns JSX to be at the end of the input
   */
  DXAdornmentEnd?: () => JSX.Element;
};
export type InputTextProps = InputTextPropsNative & InputTextPropsCustom;

const containerStyles = css`
  font-family: ${makeFontFamily("body")};
  --input-color: ${makeColor("neutral-light-900")};
  --input-color--focus: ${makeColor("neutral-light-1200")};
  --input-border-color: ${makeColor("neutral-light-900")};
  --input-border-color--focus: ${makeColor("neutral-light-1200")};

  .error {
    margin-top: ${makeRem(4)};
    font-size: 0.8em;
    font-weight: ${makeFontWeight("body-bold")};
  }

  label {
    color: var(--input-color) !important;
    display: flex;
  }

  &:has(input:focus) {
    label {
      color: var(--input-color--focus) !important;
    }

    input {
      border-color: var(--input-border-color--focus);
      color: var(--input-color--focus);
    }
  }

  &:has(input.invalid),
  &:has(input:invalid) {
    color: ${makeColor("danger-600")} !important;

    div {
      color: ${makeColor("danger-600")} !important;
    }

    input {
      color: ${makeColor("danger-600")};
      border-color: ${makeColor("danger-600")};
      background-color: ${makeColor("danger", { opacity: 0.1 })} !important;
    }
  }
`;

const wrapperStyles = css`
  position: relative;

  .adornment {
    position: absolute;
    top: 0;
    bottom: 0;
    display: grid;
    place-content: center;
    width: 2.5em;
    --icon-size: 1.5em;
    pointer-events: none;

    &.start {
      left: 0;

      & + input {
        padding-left: calc(2.5em);
      }
    }
    &.end {
      right: 0;

      & + input {
        padding-right: calc(2.5em);
      }
    }
  }
`;

const styles = css`
  ${makeReset("input")};
  padding: 0.5em 1em;
  border-radius: ${makeRem(4)};
  font-family: ${makeFontFamily("body")};
  color: var(--input-color);
  width: 100%;
  transition: all 0.15s ease-in-out;

  &.transparent {
    border: 1px solid ${makeColor("neutral-light-300")};
    background: transparent;
  }

  &.contrasted {
    border: 1px solid transparent;
    background: ${makeColor("neutral-light-100", { opacity: 0.3 })};
  }
`;

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(
    {
      className,
      dxVariant = "transparent",
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
      <div className={classes(containerStyles, dxSize, fontSizeStyles)}>
        {useMemo(() => {
          if (!dxLabel) return null;
          return (
            <label htmlFor={inputId}>
              <InputLabelContent dxLabel={dxLabel} dxHint={dxHint} />
            </label>
          );
        }, [dxHint, dxLabel, inputId])}
        <div className={wrapperStyles}>
          {useMemo(
            () =>
              DXAdornmentStart && (
                <div className="adornment start">
                  <DXAdornmentStart />
                </div>
              ),
            [DXAdornmentStart]
          )}
          {useMemo(
            () => (
              <input
                {...restProps}
                type={type}
                id={inputId}
                className={classes(className, styles, dxVariant, {
                  invalid: !!dxError,
                })}
                ref={ref}
              />
            ),
            [className, dxError, dxVariant, inputId, ref, restProps, type]
          )}
          {useMemo(
            () => (
              <div className="adornment end">
                {DXAdornmentEnd && <DXAdornmentEnd />}
              </div>
            ),
            [DXAdornmentEnd]
          )}
        </div>
        {dxError && <div className="error">{dxError}</div>}
      </div>
    );
  }
);
