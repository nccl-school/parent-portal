import { css } from "@linaria/core";
import { makeCustom } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type HeaderActionsItemPropsNative = JSX.IntrinsicElements["li"];
// export type HeaderActionsItemPropsCustom = {};
export type HeaderActionsItemProps = HeaderActionsItemPropsNative;

const styles = css`
  height: 100%;
  min-width: ${makeCustom("header--height-desktop")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderActionsItem = forwardRef<
  HTMLLIElement,
  HeaderActionsItemProps
>(function HeaderActionsItem({ children, className, ...restProps }, ref) {
  return (
    <li {...restProps} className={classes(className, styles)} ref={ref}>
      {children}
    </li>
  );
});
