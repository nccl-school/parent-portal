import { useModalContext } from "./modal.useModalContext.js";

import { Button } from "../button/Button.js";

export function ModalFooterCancel() {
  const { close: closeModal } = useModalContext();
  return (
    <Button
      dxVariant="outlined"
      dxColor="primary"
      dxSize="md"
      type="button"
      onClick={closeModal}
    >
      close
    </Button>
  );
}
