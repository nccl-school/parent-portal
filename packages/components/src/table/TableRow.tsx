import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableRowPropsNative = JSX.IntrinsicElements["tr"];
// export type TableRowPropsCustom = {};
export type TableRowProps = TableRowPropsNative;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ children, className, ...restProps }, ref) {
    return (
      <tr {...restProps} className={classes(className)} ref={ref}>
        {children}
      </tr>
    );
  }
);
