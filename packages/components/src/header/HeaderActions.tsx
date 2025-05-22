import { css } from "@linaria/core";
import { makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type HeaderActionsPropsNative = JSX.IntrinsicElements["ul"];
// export type HeaderActionsPropsCustom = {};
export type HeaderActionsProps = HeaderActionsPropsNative;

const styles = css`
  ${makeReset("ul")};
  display: flex;
  height: 100%;
`;

export const HeaderActions = forwardRef<HTMLUListElement, HeaderActionsProps>(
  function HeaderActions({ children, className, ...restProps }, ref) {
    return (
      <ul {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </ul>
    );
  }
);
