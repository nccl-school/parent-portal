import { css } from "@linaria/core";
import { makeRem, makeColor, makeFontWeight, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

export type PopoverMenuActionProps = JSX.IntrinsicElements["button"];

const styles = css`
  ${makeReset("button")};
  padding: 0 ${makeRem(8)};
  height: ${makeRem(36)};
  display: flex;
  align-items: center;
  gap: ${makeRem(12)};
  transition: all 0.15s ease-in-out;
  width: 100%;
  outline: 1px solid transparent;

  &:hover,
  &:focus {
    cursor: pointer;
    background: ${makeColor("light-300")};
    color: ${makeColor("primary-1200")} !important;
    font-weight: ${makeFontWeight("body-bold")} !important;
  }
  &:focus {
    outline: 1px solid ${makeColor("light-400")};
  }
`;

export function PopoverMenuItemAction({
  className,
  children,
  ...restProps
}: PopoverMenuActionProps) {
  return (
    <button className={classes(styles, className)} {...restProps}>
      {children}
    </button>
  );
}
