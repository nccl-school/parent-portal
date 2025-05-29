import { useContext } from "react";

import type { ModalContextType } from "./modal.utils.js";
import { ModalContext } from "./modal.utils.js";

import type { ModalState } from "../_core/modal/ModalEngine.js";

export function useModalContext<
  S extends ModalState = ModalState,
>(): ModalContextType<S> {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "'useModalContext()' must be used within a <ModalProvide /> component"
    );
  }
  return context;
}
