import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type CalendarBodyPropsNative = JSX.IntrinsicElements["div"];
export type CalendarBodyProps = CalendarBodyPropsNative;

const styles = css`
  display: contents;
`;

export const CalendarBody = forwardRef<HTMLDivElement, CalendarBodyProps>(
  function CalendarBody({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
