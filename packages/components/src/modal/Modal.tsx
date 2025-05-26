import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";

import type { ModalVariants } from "./modal.styles.js";
import { baseStyles, modalStyles } from "./modal.styles.js";

export type ModalPropsNative = JSX.IntrinsicElements["dialog"];
export type ModalPropsCustom = {
  /**
   * @default basic
   */
  dxVariant?: ModalVariants;
};
export type ModalProps = ModalPropsNative & ModalPropsCustom;

const styles = css`
  position: relative;
`;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { children, className, dxVariant = "basic", ...restProps },
  ref
) {
  return (
    <dialog
      {...restProps}
      className={classes(className, baseStyles, modalStyles[dxVariant], styles)}
      ref={ref}
    >
      {children}
    </dialog>
  );
});
