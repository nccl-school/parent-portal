import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

export type PopoverMenuItemProps = JSX.IntrinsicElements["li"];

const styles = css`
  & + & {
    margin-top: ${makeRem(4)};
  }
`;

export const PopoverMenuItem = forwardRef<HTMLLIElement, PopoverMenuItemProps>(
  function PopoverMenuItem({ children, className, ...restProps }, ref) {
    return (
      <li {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </li>
    );
  }
);
