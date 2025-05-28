import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableBodyPropsNative = JSX.IntrinsicElements["tbody"];
// export type TableBodyPropsCustom = {};
export type TableBodyProps = TableBodyPropsNative;

const styles = css`
  &::after,
  &:before {
    display: block;
    content: "";
  }
`;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ children, className, ...restProps }, ref) {
    return (
      <tbody {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </tbody>
    );
  }
);
