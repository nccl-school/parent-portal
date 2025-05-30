import { css } from "@linaria/core";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type InputRadioPropsNative = Omit<
  JSX.IntrinsicElements["input"],
  "type"
>;
export type InputRadioPropsCustom = {
  dxVariant: "default" | "card";
  dxSize?: "sm" | "md" | "lg";
};
export type InputRadioProps = InputRadioPropsNative & InputRadioPropsCustom;

const styles = css`
  ${makeReset("input")};
  position: relative;

  input {
    appearance: none;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    outline: none;
  }

  &.card {
    border: 1px solid ${makeColor("neutral-light-100")};
    display: block;
    border-radius: ${makeRem(8)};
    transition: all 0.15s ease-in-out;
    outline: 2px solid transparent;

    &.sm {
      padding: ${makeRem(8)};
      & + & {
        margin-top: ${makeRem(4)};
      }
    }

    &.md {
      padding: ${makeRem(16)};
      & + & {
        margin-top: ${makeRem(8)};
      }
    }

    &.lg {
      padding: ${makeRem(24)};
    }

    &:has(input:checked) {
      border-color: ${makeColor("neutral-light-1000")};
      background-color: ${makeColor("neutral-light", { opacity: 0.1 })};
    }

    &:has(input:focus) {
      outline: 2px solid ${makeColor("neutral-light-1000")};
    }
  }

  &.basic {
  }
`;

export const InputRadio = forwardRef<HTMLInputElement, InputRadioProps>(
  function InputRadio(
    { className, children, dxVariant = "default", dxSize = "md", ...restProps },
    ref
  ) {
    return (
      <label className={classes(className, styles, dxVariant, dxSize)}>
        <input {...restProps} ref={ref} type="radio" />
        {children}
      </label>
    );
  }
);
