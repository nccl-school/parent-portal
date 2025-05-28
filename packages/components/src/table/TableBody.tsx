import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableBodyPropsNative = JSX.IntrinsicElements["tbody"];
// export type TableBodyPropsCustom = {};
export type TableBodyProps = TableBodyPropsNative;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ children, className, ...restProps }, ref) {
    return (
      <tbody {...restProps} className={classes(className)} ref={ref}>
        {children}
      </tbody>
    );
  }
);
