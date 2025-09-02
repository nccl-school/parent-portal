import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";

export type ModalFooterPropsNative = JSX.IntrinsicElements["footer"];
export type ModalFooterProps = ModalFooterPropsNative;

const styles = css`
  padding: ${makeRem(16)} var(--modal-gutters);
  border-top: 1px solid ${makeColor("neutral-light-100")};
  background: ${makeColor("light-100")};
  display: flex;
  justify-content: flex-end;
  gap: ${makeRem(16)};
`;

export const ModalFooter = forwardRef<HTMLElement, ModalFooterProps>(
  function ModalFooter({ children, className, ...restProps }, ref) {
    return (
      <footer {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </footer>
    );
  }
);
