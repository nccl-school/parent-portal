import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";

import { ModalHeaderClose } from "./ModalHeaderClose.js";

export type ModalHeaderPropsNative = JSX.IntrinsicElements["header"];
export type ModalHeaderProps = ModalHeaderPropsNative;

const styles = css`
  padding: ${makeRem(32)} var(--modal-gutters);
  background: ${makeColor("white")};
  padding-bottom: ${makeRem(16)};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${makeRem(24)};
  z-index: 10;
`;

export const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(
  function ModalHeader({ children, className, ...restProps }, ref) {
    return (
      <header {...restProps} className={classes(className, styles)} ref={ref}>
        <div>{children}</div>
        <ModalHeaderClose />
      </header>
    );
  }
);
