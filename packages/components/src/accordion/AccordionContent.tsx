import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css``;

export type AccordionContentProps = JSX.IntrinsicElements["div"];

export function AccordionContent({
  className,
  children,
  ...restProps
}: AccordionContentProps) {
  return (
    <div {...restProps} className={classes(styles, className)}>
      {children}
    </div>
  );
}
