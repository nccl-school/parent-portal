import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableHeadColPropsNative = JSX.IntrinsicElements["th"];
// export type TableHeadColPropsCustom = {};
export type TableHeadColProps = TableHeadColPropsNative;

export const TableHeadCol = forwardRef<HTMLTableCellElement, TableHeadColProps>(
  function TableHeadCol({ children, className, ...restProps }, ref) {
    return (
      <th {...restProps} className={classes(className)} ref={ref}>
        {children}
      </th>
    );
  }
);
