import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type CalendarBodyRowPropsNative = JSX.IntrinsicElements["div"];
export type CalendarBodyRowProps = CalendarBodyRowPropsNative;

const styles = css`
  display: contents;
`;

export const CalendarBodyRow = forwardRef<HTMLDivElement, CalendarBodyRowProps>(
  function CalendarBodyRow({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
