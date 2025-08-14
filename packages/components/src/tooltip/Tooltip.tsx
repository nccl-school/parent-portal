import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

import { Typography } from "../typography/Typography.js";

export type TooltipProps = JSX.IntrinsicElements["div"];

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
  --shadow-color: 0deg 0% 63%;
  --shadow-elevation-medium:
    0.1px 0.3px 0.4px hsl(var(--shadow-color) / 0.36),
    0.4px 0.9px 1.1px -0.8px hsl(var(--shadow-color) / 0.36),
    1.1px 2.1px 2.7px -1.7px hsl(var(--shadow-color) / 0.36),
    2.6px 5.2px 6.5px -2.5px hsl(var(--shadow-color) / 0.36);

  box-shadow: var(--shadow-elevation-medium);
  border: 0;
  margin: 0;
  padding: 0;
  background: ${makeColor("neutral-dark-800")};
  padding: ${makeRem(8)} ${makeRem(12)};
  border-radius: ${makeRem(8)};
  color: ${makeColor("white")};

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

export function Tooltip({
  children,
  className,
  ref,
  ...restProps
}: TooltipProps) {
  return (
    <div ref={ref} className={classes(styles, className)} {...restProps}>
      {typeof children === "string" ? (
        <Typography dxVariant="label" dxNode="span">
          {children}
        </Typography>
      ) : (
        children
      )}
    </div>
  );
}
