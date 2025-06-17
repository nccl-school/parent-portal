import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type CalendarHeaderPropsNative = JSX.IntrinsicElements["div"];
export type CalendarHeaderProps = CalendarHeaderPropsNative;

const styles = css`
  display: contents;
`;

export const CalendarHeader = forwardRef<HTMLDivElement, CalendarHeaderProps>(
  function CalendarHeader({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(styles, className)} ref={ref}>
        {children}
      </div>
    );
  }
);
