import { css } from "@linaria/core";
import { makeColor, makeCustom, makeFontWeight, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

import { Typography } from "../typography/Typography.js";

export type TableHeadColPropsNative = JSX.IntrinsicElements["th"];
export type TableHeadColPropsCustom = {
  /**
   * Position the content horizontally
   * @default left
   */
  dxJustify?: "left" | "center" | "right";
};
export type TableHeadColProps = TableHeadColPropsNative &
  TableHeadColPropsCustom;

const styles = css`
  padding: 0;

  &:first-child {
    div {
      border-top-left-radius: ${makeRem(8)};
    }
  }

  &:last-child {
    div {
      border-top-right-radius: ${makeRem(8)};
    }
  }

  & > div {
    height: ${makeRem(48)};
    display: grid;
    place-content: center;
    padding: 0 ${makeCustom("table--cell-padding")};
    font-weight: ${makeFontWeight("body-bold")} !important;
    font-size: ${makeRem(14)} !important;
    background: ${makeColor("neutral-light-50")};
    color: ${makeColor("neutral-light-1100")};
  }

  &.j-left {
    div {
      justify-content: start;
    }
  }
  &.j-right {
    div {
      justify-content: end;
    }
  }
  &.j-center {
    div {
      justify-content: center;
    }
  }
`;

export const TableHeadCol = forwardRef<HTMLTableCellElement, TableHeadColProps>(
  function TableHeadCol(
    { children, className, dxJustify = "left", ...restProps },
    ref
  ) {
    return (
      <th
        {...restProps}
        className={classes(className, styles, `j-${dxJustify}`)}
        ref={ref}
      >
        <Typography dxVariant="body2" dxNode="div">
          {children}
        </Typography>
      </th>
    );
  }
);
