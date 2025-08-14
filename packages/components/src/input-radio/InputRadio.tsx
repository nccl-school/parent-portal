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
    margin: 0;
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
  }

  &.default {
    padding-left: ${makeRem(32)};
    position: relative;
    min-height: ${makeRem(32)};
    display: inline-block;
    border-radius: ${makeRem(2)};

    &:has(div),
    &:has(span) {
      padding-right: ${makeRem(6)};
      padding-top: ${makeRem(6)};
      padding-bottom: ${makeRem(6)};
    }

    &::before,
    &::after {
      content: "";
      position: absolute;
      height: ${makeRem(32)};
      aspect-ratio: 1 / 1;
      background: transparent;
      border-radius: 50%;
      transform: scale(0.5);
      transform-origin: center;
      left: 0;
      top: 0;
    }
    &::before {
      border: 2px solid ${makeColor("neutral-light-400")};
    }
    &::after {
      opacity: 0;
      border: 4px solid ${makeColor("white")};
      scale: 0.8;
      transform-origin: center;
    }

    &:has(input:checked) {
      &::before {
        border-color: ${makeColor("secondary-1200")};
        background-color: ${makeColor("secondary-1200")};
      }
      &::after {
        opacity: 1;
      }
    }
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
