import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { match } from "ts-pattern";

import { Icon, type IconPropsCustom } from "../icons/Icon.js";

export type ButtonIconPropsNative = JSX.IntrinsicElements["button"];
export type ButtonIconPropsCustom = Omit<IconPropsCustom, "dxSize"> & {
  dxSize?: "sm" | "md" | "lg";
  /**
   * @default basic
   */
  dxStyle?: "outlined" | "basic";
};
export type ButtonIconProps = ButtonIconPropsNative & ButtonIconPropsCustom;

const styles = css`
  ${makeReset("button")};
  border-radius: ${makeRem(4)};
  padding: ${makeRem(8)};
  display: grid;
  place-content: center;
  transition: all 0.15s ease-in-out;
  outline: none;
  color: ${makeColor("neutral-light-600")};

  &.outlined {
    border: 1px solid ${makeColor("neutral-light-200")};
  }

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    background: ${makeColor("neutral-light-100", { opacity: 0.5 })};
    color: ${makeColor("neutral-light-1300")};
    cursor: pointer;
  }
  &:focus {
    border: 1px solid ${makeColor("primary-1200")} !important;
    color: ${makeColor("neutral-light-1300")};
  }

  &.sm {
    height: ${makeRem(24)};
    width: ${makeRem(24)};
  }
  &.md {
    height: ${makeRem(32)};
    width: ${makeRem(32)};
  }
  &.lg {
    height: ${makeRem(44)};
    width: ${makeRem(44)};
  }
`;

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ButtonIcon(
    {
      children,
      className,
      dxIcon,
      dxColor,
      dxSize = "sm",
      dxStyle = "basic",
      ...restProps
    },
    ref
  ) {
    return (
      <button
        {...restProps}
        className={classes(className, styles, dxSize, dxStyle)}
        ref={ref}
      >
        <Icon
          dxIcon={dxIcon}
          dxColor={dxColor}
          dxSize={match(dxSize)
            .with("sm", () => 16)
            .with("md", () => 20)
            .with("lg", () => 24)
            .exhaustive()}
        />
      </button>
    );
  }
);
