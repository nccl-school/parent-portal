import { useEffect, useRef } from "react";

import type { ReactModalState } from "./Modal.provider.js";

import type { ModalOptions } from "../_core/modal/index.js";
import { ModalEngine } from "../_core/modal/index.js";

export function useModal<T extends ReactModalState = ReactModalState>(
  options?: Partial<ModalOptions>
): ModalEngine<T> {
  const ref = useRef<ModalEngine<T>>(new ModalEngine<T>(options));

  useEffect(() => {
    const modal = ref.current;
    // destroy the modal on unmount
    return () => {
      modal.destroy();
    };
  }, []);

  return ref.current;
}
