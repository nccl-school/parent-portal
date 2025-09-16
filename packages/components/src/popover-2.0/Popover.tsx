import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const styles = css`
  @keyframes animate-open {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes animate-close {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  --duration: 0.15s;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border: 0;
  margin: 0;
  border: 1px solid ${makeColor("neutral-light-50")};
  padding: ${makeRem(8)};
  border-radius: ${makeRem(8)};

  &:not(:popover-open) {
    display: none;
  }

  &:popover-open {
    animation: animate-open var(--duration) ease-in-out;
  }

  &.close {
    animation: animate-close var(--duration) ease-in-out;
  }
`;

export type PopoverProps = JSX.IntrinsicElements["div"];

export function Popover({ className, children, ...restProps }: PopoverProps) {
  return (
    <div {...restProps} className={classes(styles, className)}>
      {children}
    </div>
  );
}
