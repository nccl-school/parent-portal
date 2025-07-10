import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { makeFontWeight } from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

export type DescriptionListDataPropsNative = JSX.IntrinsicElements["dd"];
export type DescriptionListDataProps = DescriptionListDataPropsNative;

export const DescriptionListData = forwardRef<
  HTMLDataListElement,
  DescriptionListDataProps
>(function DescriptionListData({ children, className, ...restProps }, ref) {
  return (
    <dd {...restProps} className={classes(className)} ref={ref}>
      {typeof children === "string" || typeof children === "number" ? (
        <Typography
          dxVariant="body3"
          dxNode="div"
          style={{ fontWeight: makeFontWeight("body-semiBold") }}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
    </dd>
  );
});
