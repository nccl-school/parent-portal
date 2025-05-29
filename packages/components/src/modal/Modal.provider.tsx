import { type RefCallback, type ReactNode, useMemo, useCallback } from "react";
import { useSyncExternalStore } from "react";

import { ModalContext } from "./modal.utils.js";

import type { ModalState, ModalEngine } from "../_core/modal/index.js";

export type ReactModalState = ModalState & { isOpen: boolean };

export type ModalProviderProps<S extends ReactModalState> = {
  dxEngine: ModalEngine<S>;
  dxOnMount?: RefCallback<HTMLDialogElement>;
  children: ReactNode;
};

export function ModalProvider<S extends ReactModalState>({
  children,
  dxEngine,
}: ModalProviderProps<S>) {
  const queue = dxEngine.getQueue();
  const state = useSyncExternalStore(
    queue.subscribe,
    queue.getSnapshot,
    queue.getSnapshot
  );

  const close = useCallback(async () => {
    await dxEngine.close();
    dxEngine.destroy();
    setTimeout(() => {
      dxEngine.setState((draft) => {
        draft.isOpen = false;
      });
    }, 500);
  }, [dxEngine]);

  const value = useMemo(
    () => ({
      state,
      open: dxEngine.open,
      close,
    }),
    [close, dxEngine.open, state]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
