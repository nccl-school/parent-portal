import { css } from "@linaria/core";
import { makeColor, makeFontFamily, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type InputCheckboxPropsNative = JSX.IntrinsicElements["input"];
export type InputCheckboxProps = InputCheckboxPropsNative;

const styles = css`
  --checkbox-size: ${makeRem(20)};

  display: grid;
  height: var(--checkbox-size);
  width: var(--checkbox-size);
  border: 1px solid ${makeColor("neutral-light-300")};
  background: transparent;
  border-radius: ${makeRem(4)};
  transition: all 0.1s ease-in-out;
  position: relative;
  font-size: var(--checkbox-size);

  & > input {
    appearance: unset !important;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: none;
    }
  }

  &:has(input:active) {
    transform: scale(0.9);
  }

  &:has(input:focus),
  &:hover,
  &:has(input:hover) {
    border: 1px solid ${makeColor("neutral-light-1200")};
    cursor: pointer;
  }

  &:has(input:checked) {
    border: 1px solid ${makeColor("primary-1000")};
    background: ${makeColor("primary-700")};
    &:before {
      content: "✓";
      position: absolute;
      width: var(--checkbox-size);
      height: var(--checkbox-size);
      top: -${makeRem(1)};
      left: -${makeRem(1)};
      border: 1px solid transparent;
      display: grid;
      place-content: center;
      color: ${makeColor("neutral-light-50")};
      font-size: 0.75em;
      font-family: ${makeFontFamily("body")};
    }
  }
`;

export const InputCheckbox = forwardRef<HTMLInputElement, InputCheckboxProps>(
  function InputCheckbox({ children, className, ...restProps }, ref) {
    return (
      <label className={styles}>
        <input
          type="checkbox"
          {...restProps}
          className={classes(className)}
          ref={ref}
        />
      </label>
    );
  }
);
