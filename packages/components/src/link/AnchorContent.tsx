import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { makeColor, makeFontWeight } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

const styles = css`
  && {
    font-weight: ${makeFontWeight("body-semiBold")};
    color: ${makeColor("tertiary-1200")};
    text-decoration: underline;
  }
`;

export type AnchorContentProps = JSX.IntrinsicElements["span"];

export function AnchorContent({
  className,
  children,
  ...restProps
}: AnchorContentProps) {
  return (
    // @ts-expect-error The spread types don't match up but it's technically good
    <Typography
      {...restProps}
      dxNode="span"
      dxVariant="body3"
      className={classes(styles, className)}
    >
      {children}
    </Typography>
  );
}
