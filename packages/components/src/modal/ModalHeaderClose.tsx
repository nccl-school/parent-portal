import { useModalContext } from "./modal.useModalContext.js";

import { Button } from "../button/Button.js";

export function ModalHeaderClose({ onClose }: { onClose?: () => void }) {
  const { close: closeModal } = useModalContext();
  return (
    <Button
      type="button"
      dxIcon="cancel-01-solid-standard"
      dxVariant="icon"
      dxSize="md"
      onClick={() => {
        if (onClose) onClose();
        closeModal();
      }}
    />
  );
}
