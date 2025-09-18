import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

import { Typography } from "../typography/Typography.js";

const styles = css``;

export type AccordionTitleProps = Omit<
  JSX.IntrinsicElements["div"],
  "children"
> & {
  children: string;
};

export function AccordionTitle({
  className,
  children,
  ...restProps
}: AccordionTitleProps) {
  return (
    <Typography
      dxNode="div"
      dxVariant="heading5"
      className={classes(styles, className)}
      {...restProps}
    >
      {children}
    </Typography>
  );
}
