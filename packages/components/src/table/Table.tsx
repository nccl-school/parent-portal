import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TablePropsNative = JSX.IntrinsicElements["table"];
// export type TablePropsCustom = {};
export type TableProps = TablePropsNative;

const containerStyles = css`
  width: 100%;
  max-height: 100%;
  overflow: auto;
`;

const styles = css`
  width: 100%;
  position: relative;
  border: 0;
  padding: 0;
  border-spacing: 0;
  width: 100%;
  isolation: isolate;
`;

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { children, className, ...restProps },
  ref
) {
  return (
    <div className={containerStyles}>
      <table {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </table>
    </div>
  );
});
