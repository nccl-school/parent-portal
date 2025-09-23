import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";

export type PopoverMenuItemProps = JSX.IntrinsicElements["li"];

const styles = css`
  a {
    text-decoration: none !important;
  }
`;

export const PopoverMenuItem = forwardRef<HTMLLIElement, PopoverMenuItemProps>(
  function PopoverMenuItem({ children, className, ...restProps }, ref) {
    return (
      <li {...restProps} className={classes(styles, className)} ref={ref}>
        {children}
      </li>
    );
  }
);
