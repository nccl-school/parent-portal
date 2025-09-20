import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";

export type ModalBodyPropsNative = JSX.IntrinsicElements["div"];
export type ModalBodyProps = ModalBodyPropsNative;

const styles = css`
  padding: 0 var(--modal-gutters);
  padding-bottom: var(--modal-gutters);
`;

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  function ModalBody({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </div>
    );
  }
);
