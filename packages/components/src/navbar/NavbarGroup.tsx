import { css } from "@linaria/core";
import { makeReset, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type NavbarGroupPropsNative = JSX.IntrinsicElements["ul"];
// export type NavbarGroupPropsCustom = {};
export type NavbarGroupProps = NavbarGroupPropsNative;

const styles = css`
  ${makeReset("ul")};
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  &:last-child {
    display: none;
  }

  ${makeResponsive({ from: "laptop" })} {
    display: flex;
    flex-direction: column;

    &:last-child {
      display: flex;
    }
  }
`;

export const NavbarGroup = forwardRef<HTMLUListElement, NavbarGroupProps>(
  function NavbarGroup({ children, className, ...restProps }, ref) {
    return (
      <ul {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </ul>
    );
  }
);
