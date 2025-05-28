import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TableHeadPropsNative = JSX.IntrinsicElements["thead"];
// export type TableHeadPropsCustom = {};
export type TableHeadProps = TableHeadPropsNative;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  function TableHead({ children, className, ...restProps }, ref) {
    return (
      <thead {...restProps} className={classes(className)} ref={ref}>
        {children}
      </thead>
    );
  }
);
