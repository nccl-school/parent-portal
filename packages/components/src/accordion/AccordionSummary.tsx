import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css`
  display: flex;
`;

export type AccordionSummaryProps = JSX.IntrinsicElements["summary"];

export function AccordionSummary({
  className,
  children,
  ...restProps
}: AccordionSummaryProps) {
  return (
    <summary {...restProps} className={classes(styles, className)}>
      {children}
    </summary>
  );
}
