import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TablePropsNative = JSX.IntrinsicElements["table"];
// export type TablePropsCustom = {};
export type TableProps = TablePropsNative;

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { children, className, ...restProps },
  ref
) {
  return (
    <table {...restProps} className={classes(className)} ref={ref}>
      {children}
    </table>
  );
});
