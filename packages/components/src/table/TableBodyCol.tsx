import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableBodyColPropsNative = JSX.IntrinsicElements["td"];
// export type TableBodyColPropsCustom = {};
export type TableBodyColProps = TableBodyColPropsNative;

export const TableBodyCol = forwardRef<HTMLTableCellElement, TableBodyColProps>(
  function TableBodyCol({ children, className, ...restProps }, ref) {
    return (
      <td {...restProps} className={classes(className)} ref={ref}>
        {children}
      </td>
    );
  }
);
