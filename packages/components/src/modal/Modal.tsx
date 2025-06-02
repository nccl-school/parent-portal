import { classes } from "@stratum-ui/core/utils";
import type { JSX, RefCallback } from "react";
import { forwardRef, useCallback, useEffect } from "react";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { createPortal } from "react-dom";

import type { ModalVariants } from "./modal.styles.js";
import { backdropStyles, modalStyles } from "./modal.styles.js";
import type { ReactModalState } from "./Modal.provider.js";
import { ModalProvider } from "./Modal.provider.js";
import { useModalContext } from "./modal.useModalContext.js";

import type { ModalEngine } from "../_core/modal/ModalEngine.js";
import { useForwardedRef } from "../hooks/hook.useForwardedRef.js";
import { useDynamicNode } from "../useDynamicNode/index.js";

export type ModalPropsNative = JSX.IntrinsicElements["dialog"];
export type ModalPropsCustom = {
  /**
   * @default basic
   */
  dxVariant?: ModalVariants;
  dxEngine: ModalEngine<ReactModalState>;
};
export type ModalProps = ModalPropsNative & ModalPropsCustom;

const styles = css`
  position: relative;
  border-radius: ${makeRem(8)};
`;

export const ModalContent = forwardRef<HTMLDialogElement, ModalProps>(
  function Modal(
    { children, className, dxEngine, dxVariant = "basic", ...restProps },
    ref
  ) {
    const modalRef = useForwardedRef(ref);
    const dynamicNode = useDynamicNode();
    const { state } = useModalContext();

    const handleOnMount = useCallback<RefCallback<HTMLDialogElement>>(
      (node) => {
        modalRef.current = node;
        dxEngine.onMount(node, { openOnMount: true });
      },
      [dxEngine, modalRef]
    );

    useEffect(() => {
      if (state.isOpen) return;
      dynamicNode.destroyNode();
    }, [dynamicNode, state.isOpen]);

    if (!state.isOpen) return null;

    return createPortal(
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
      </dialog>,
      dynamicNode.getDynamicNode()
    );
  }
);

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  { dxEngine, ...restProps },
  ref
) {
  return (
    <ModalProvider dxEngine={dxEngine}>
      <ModalContent {...restProps} dxEngine={dxEngine} ref={ref} />
    </ModalProvider>
  );
});
