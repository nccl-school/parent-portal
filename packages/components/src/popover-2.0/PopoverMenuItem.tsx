import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";

export type PopoverMenuItemProps = JSX.IntrinsicElements["li"];

export const PopoverMenuItem = forwardRef<HTMLLIElement, PopoverMenuItemProps>(
  function PopoverMenuItem({ children, className, ...restProps }, ref) {
    return (
      <li {...restProps} className={classes(className)} ref={ref}>
        {children}
      </li>
    );
  }
);
