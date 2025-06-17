import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeRem, makeFontWeight } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type CalendarHeaderCellPropsNative = JSX.IntrinsicElements["div"];
export type CalendarHeaderCellProps = CalendarHeaderCellPropsNative;

const styles = css`
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  background: white;
  display: grid;
  place-content: center;
  color: ${makeColor("neutral-dark-1000")};
  height: ${makeRem(60)};
  position: sticky;
  top: 0;
  border-bottom: ${makeColor("neutral-dark-100", { opacity: 0.2 })};
  background: ${makeColor("neutral-light-100", { opacity: 0.3 })};
  z-index: 10;
  backdrop-filter: blur(5px);

  &.active {
    background: ${makeColor("primary", { opacity: 0.2 })};
    color: ${makeColor("primary-1200")};
  }

  & > * {
    font-size: ${makeRem(16)} !important;
    text-transform: uppercase;
    font-weight: ${makeFontWeight("heading-semiBold")};
  }
`;

export const CalendarHeaderCell = forwardRef<
  HTMLDivElement,
  CalendarHeaderCellProps
>(function CalendarHeaderCell({ children, className, ...restProps }, ref) {
  return (
    <div {...restProps} className={classes(styles, className)} ref={ref}>
      <Typography dxVariant="label" dxNode="div">
        {children}
      </Typography>
    </div>
  );
});
