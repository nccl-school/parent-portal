import { css } from "@linaria/core";
import { makeColor, makeCustom } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

import { Typography } from "../typography/Typography.js";

export type TableBodyColPropsNative = JSX.IntrinsicElements["td"];
// export type TableBodyColPropsCustom = {};
export type TableBodyColProps = TableBodyColPropsNative;

const styles = css`
  border-bottom: 1px solid ${makeColor("neutral-light-100")};
  background: white;

  & > div {
    padding: ${`${makeCustom("table--body-cell-padding-v")} ${makeCustom("table--cell-padding")}`};
  }
`;

export const TableBodyCol = forwardRef<HTMLTableCellElement, TableBodyColProps>(
  function TableBodyCol({ children, className, ...restProps }, ref) {
    return (
      <td {...restProps} className={classes(className, styles)} ref={ref}>
        {typeof children === "string" || typeof children === "number" ? (
          <Typography dxVariant="body1" dxNode="div">
            {children}
          </Typography>
        ) : (
          <div>{children}</div>
        )}
      </td>
    );
  }
);
