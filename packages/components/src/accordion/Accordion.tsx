import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css`
  padding: ${makeRem(24)};
  background: ${makeColor("white")};

  .open {
    display: block;
  }

  .close {
    display: none;
  }

  &[open] {
    .open {
      display: none;
    }

    .close {
      display: block;
    }
  }

  & + & {
    border-top: 1px solid ${makeColor("light-400")};
  }
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
