import { css } from "@linaria/core";
import { makeColor, makeCustom } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type HeaderPropsNative = JSX.IntrinsicElements["header"];
export type HeaderProps = HeaderPropsNative;

const styles = css`
  display: flex;
  align-items: center;
  height: ${makeCustom("header--height-desktop")};
  width: 100%;
  border-bottom: 1px solid ${makeColor("neutral-dark-50", { opacity: 0.2 })};
`;

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { children, className, ...restProps },
  ref
) {
  return (
    <header {...restProps} className={classes(className, styles)} ref={ref}>
      {children}
    </header>
  );
});
