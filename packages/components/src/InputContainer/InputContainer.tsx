import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useMemo } from "react";
import { css } from "@linaria/core";
import {
  makeFontFamily,
  makeColor,
  makeRem,
  makeFontWeight,
} from "@nccl/theme";

import { fontSizeStyles, type IntrinsicSizes } from "../shared/index.js";
import { InputLabelContent } from "../input-label/InputLabelContent.js";

export type InputContainerPropsNative = JSX.IntrinsicElements["div"];
export type InputContainerPropsCustom = {
  /**
   * The ID of the input to associate the label with the input
   */
  dxInputId: string;
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
export type InputContainerProps = InputContainerPropsNative &
  InputContainerPropsCustom;

const containerStyles = css`
  font-family: ${makeFontFamily("body")};
  --input-color: ${makeColor("neutral-light-1100")};
  --input-color--focus: ${makeColor("neutral-light-1200")};
  --input-border-color: ${makeColor("neutral-light-1100")};
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

  &:has(input:focus),
  &:has(select:focus),
  &:has(button:focus),
  &:has(textarea:focus) {
    label {
      color: var(--input-color--focus) !important;
    }

    input,
    select,
    button,
    textarea {
      border-color: var(--input-border-color--focus);
      color: var(--input-color--focus);
    }
  }

  &:has(div.invalid) {
    color: ${makeColor("danger-600")} !important;

    div {
      color: ${makeColor("danger-600")} !important;
    }

    .field {
      background: ${makeColor("danger-100", { opacity: 0.2 })};
    }
  }

  &:has(input.invalid),
  &:has(input:invalid),
  &:has(select.invalid),
  &:has(select:invalid),
  &:has(textarea:invalid),
  &:has(textarea.invalid) {
    color: ${makeColor("danger-600")} !important;

    div {
      color: ${makeColor("danger-600")} !important;
    }

    input,
    select,
    button,
    textarea {
      color: ${makeColor("danger-600")};
      border-color: ${makeColor("danger-600")};
      background-color: ${makeColor("danger", { opacity: 0.1 })} !important;
    }
  }
`;

const wrapperStyles = css`
  position: relative;
  height: 100%;

  &:has(.adornment.start) {
    button,
    select,
    input {
      padding-left: calc(2.5em);
    }
  }
  &:has(.adornment.end) {
    button,
    select,
    input {
      padding-right: calc(2.5em);
    }
  }

  .adornment {
    pointer-events: all;
    position: absolute;
    top: 0;
    bottom: 0;
    display: grid;
    place-content: center;
    width: 2.5em;
    --icon-size: 1.5em;
    pointer-events: none;
    z-index: 10;

    &.start {
      left: 0;
    }
    &.end {
      right: 0;
    }
  }
`;

export const InputContainer = forwardRef<HTMLDivElement, InputContainerProps>(
  function InputContainer(
    {
      className,
      dxSize = "md",
      dxLabel,
      dxHint,
      dxError,
      dxInputId,
      DXAdornmentEnd,
      DXAdornmentStart,
      children,
      ...restProps
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={classes(containerStyles, dxSize, fontSizeStyles, className)}
        {...restProps}
      >
        {useMemo(() => {
          if (!dxLabel) return null;
          return (
            <label htmlFor={dxInputId}>
              <InputLabelContent dxLabel={dxLabel} dxHint={dxHint} />
            </label>
          );
        }, [dxHint, dxLabel, dxInputId])}
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

          {children}
          {useMemo(
            () =>
              DXAdornmentEnd && (
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
