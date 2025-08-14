import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableRowPropsNative = JSX.IntrinsicElements["tr"];
export type TableRowProps = TableRowPropsNative;

const styles = css`
  position: relative;
`;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ children, className, ...restProps }, ref) {
    return (
      <tr {...restProps} className={classes(styles, className)} ref={ref}>
        {children}
      </tr>
    );
  }
);
