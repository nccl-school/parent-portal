import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type PopoverMenuPropsNative = JSX.IntrinsicElements["ul"];
// export type PopoverMenuPropsCustom = {};
export type PopoverMenuProps = PopoverMenuPropsNative;

const styles = css`
  ${makeReset("ul")};
  padding: ${makeRem(8)} 0;
`;

export const PopoverMenu = forwardRef<HTMLUListElement, PopoverMenuProps>(
  function PopoverMenu({ children, className, ...restProps }, ref) {
    return (
      <ul {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </ul>
    );
  }
);
