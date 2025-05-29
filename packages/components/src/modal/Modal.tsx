import { classes } from "@stratum-ui/core/utils";
import type { JSX, RefCallback } from "react";
import { forwardRef, useCallback } from "react";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import type { ModalVariants } from "./modal.styles.js";
import { backdropStyles, modalStyles } from "./modal.styles.js";
import { ModalProvider } from "./Modal.provider.js";

import type { ModalEngine } from "../_core/modal/ModalEngine.js";
import { useForwardedRef } from "../hooks/hook.useForwardedRef.js";

export type ModalPropsNative = JSX.IntrinsicElements["dialog"];
export type ModalPropsCustom = {
  /**
   * @default basic
   */
  dxVariant?: ModalVariants;
  dxEngine: ModalEngine;
};
export type ModalProps = ModalPropsNative & ModalPropsCustom;

const styles = css`
  position: relative;
  border-radius: ${makeRem(8)};
`;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { children, className, dxEngine, dxVariant = "basic", ...restProps },
  ref
) {
  const modalRef = useForwardedRef(ref);

  const handleOnMount = useCallback<RefCallback<HTMLDialogElement>>(
    (node) => {
      modalRef.current = node;
      dxEngine.onMount(node);
    },
    [dxEngine, modalRef]
  );

  return (
    <ModalProvider dxEngine={dxEngine}>
      <dialog
        {...restProps}
        className={classes(
          className,
          backdropStyles,
          modalStyles[dxVariant],
          styles
        )}
        ref={handleOnMount}
      >
        {children}
      </dialog>
    </ModalProvider>
  );
});
