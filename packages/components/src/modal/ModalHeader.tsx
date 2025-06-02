import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeCustom, makeRem } from "@nccl/theme";

import { ModalHeaderClose } from "./ModalHeaderClose.js";

export type ModalHeaderPropsNative = JSX.IntrinsicElements["header"];
export type ModalHeaderProps = ModalHeaderPropsNative;

const styles = css`
  padding: ${makeRem(32)} ${makeCustom("modal--gutters")};
  border-bottom: 1px solid ${makeColor("neutral-light-100")};
  display: flex;
  justify-content: space-between;
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
