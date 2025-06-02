import { useModalContext } from "./modal.useModalContext.js";

import { Button } from "../button/Button.js";

export function ModalHeaderClose() {
  const { close: closeModal } = useModalContext();
  return (
    <Button
      type="button"
      dxIcon="cancel-01-stroke-standard"
      dxVariant="icon"
      dxSize="md"
      onClick={closeModal}
    />
  );
}
