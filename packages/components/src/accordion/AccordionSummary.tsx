import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { makeColor, makeRem } from "@nccl/theme";

import { Icon } from "../icons/Icon.js";
import { Typography } from "../typography/Typography.js";

const styles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${makeRem(24)};
  transition: color 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${makeColor("secondary-1000")};
  }
`;

export type AccordionSummaryProps = JSX.IntrinsicElements["summary"];

export function AccordionSummary({
  className,
  children,
  ...restProps
}: AccordionSummaryProps) {
  return (
    <summary {...restProps} className={classes(styles, className)}>
      {typeof children === "string" ? (
        <Typography dxNode="div" dxVariant="heading5">
          {children}
        </Typography>
      ) : (
        children
      )}
      <Icon
        dxIcon="add-circle-stroke-standard"
        dxSize={24}
        dxColor="neutral-dark-900"
        className="open"
      />
      <Icon
        dxIcon="remove-circle-stroke-standard"
        dxSize={24}
        dxColor="neutral-dark-900"
        className="close"
      />
    </summary>
  );
}
