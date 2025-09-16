import { css } from "@linaria/core";
import { makeReset, makeRem, makeColor, makeFontWeight } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

export type PopoverMenuActionProps = JSX.IntrinsicElements["button"];

const styles = css`
  ${makeReset("button")};
  padding: 0 ${makeRem(8)};
  height: ${makeRem(40)};
  display: flex;
  align-items: center;
  gap: ${makeRem(12)};
  transition: all 0.15s ease-in-out;
  width: 100%;
  border-radius: ${makeRem(4)};
  outline: 1px solid transparent;

  &:hover,
  &:focus {
    cursor: pointer;
    background: ${makeColor("primary", { opacity: 0.2 })};
    color: ${makeColor("primary-1100")} !important;
    font-weight: ${makeFontWeight("body-bold")} !important;
  }
  &:focus {
    outline: 1px solid ${makeColor("primary-1100")};
  }
`;

export function PopoverMenuItemAction({
  type = "button",
  className,
  children,
  ...restProps
}: PopoverMenuActionProps) {
  return (
    <button type={type} className={classes(styles, className)} {...restProps}>
      {children}
    </button>
  );
}
