import { useCallback, useMemo, useRef } from "react";
import type { MouseEvent } from "react";
import { castDraft } from "immer";

import type { ReactModalState } from "./Modal.provider.js";

import type { ModalOptions } from "../_core/modal/index.js";
import { ModalEngine } from "../_core/modal/index.js";

export function useModal<T extends ReactModalState = ReactModalState>(
  options?: Partial<ModalOptions>
) {
  const ref = useRef<ModalEngine<T>>(new ModalEngine<T>(options));

  const open = useCallback<
    (e: MouseEvent<HTMLButtonElement>, state?: T) => void
  >((_e, state) => {
    ref.current.setState(() =>
      castDraft({
        ...(state ?? {}),
        isOpen: true,
      })
    );
  }, []);

  const close = useCallback(async () => {
    await ref.current.close();
    ref.current.destroy();
    setTimeout(() => {
      ref.current.setState((draft) => {
        draft.isOpen = false;
      });
    }, 500);
  }, []);

  return useMemo(() => ({ open, close, engine: ref.current }), [close, open]);
}
