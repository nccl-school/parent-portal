import type { JSX, MouseEventHandler } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeFontWeight, makeRem, makeReset } from "@nccl/theme";

export type PopoverMenuItemPropsNative = Omit<
  JSX.IntrinsicElements["li"],
  "onClick"
>;
export type PopoverMenuItemPropsCustom = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
export type PopoverMenuItemProps = PopoverMenuItemPropsNative &
  PopoverMenuItemPropsCustom;

const styles = css`
  & + & {
    margin-top: ${makeRem(4)};
  }
  button {
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
  }
`;

export const PopoverMenuItem = forwardRef<HTMLLIElement, PopoverMenuItemProps>(
  function PopoverMenuItem(
    { children, className, onClick, ...restProps },
    ref
  ) {
    return (
      <li {...restProps} className={classes(className, styles)} ref={ref}>
        <button type="button" onClick={onClick}>
          {children}
        </button>
      </li>
    );
  }
);
