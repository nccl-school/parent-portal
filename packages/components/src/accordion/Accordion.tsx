import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css`
  padding: ${makeRem(16)};
  border-radius: ${makeRem(8)};
  background: ${makeColor("white")};
`;

export type AccordionProps = JSX.IntrinsicElements["details"];

export function Accordion({
  className,
  children,
  ...restProps
}: AccordionProps) {
  return (
    <details {...restProps} className={classes(styles, className)}>
      {children}
    </details>
  );
}
