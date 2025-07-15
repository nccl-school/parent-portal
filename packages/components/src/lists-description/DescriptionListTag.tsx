import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { makeColor } from "@nccl/theme";
import { css } from "@linaria/core";

import { Typography } from "../typography/Typography.js";

export type DescriptionListTagPropsNative = JSX.IntrinsicElements["dt"];
export type DescriptionListTagProps = DescriptionListTagPropsNative;

const styles = css`
  white-space: nowrap;
`;

export const DescriptionListTag = forwardRef<
  HTMLDataListElement,
  DescriptionListTagProps
>(function DescriptionListTag({ children, className, ...restProps }, ref) {
  return (
    <dt {...restProps} className={classes(styles, className)} ref={ref}>
      <Typography
        dxVariant="body3"
        dxNode="div"
        style={{
          color: makeColor("neutral-light-900"),
        }}
      >
        {children}
      </Typography>
    </dt>
  );
});
