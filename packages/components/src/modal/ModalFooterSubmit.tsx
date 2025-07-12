import type { ReactNode } from "react";

import type { ButtonProps } from "../button/Button.js";
import { Button } from "../button/Button.js";
import type { ButtonContainedPropsCustom } from "../button/ButtonContained.js";

export function ModalFooterSubmit({
  type = "submit",
  children,
  isLoading,
  dxColor = "secondary",
}: Pick<ButtonProps, "type"> & {
  isLoading: boolean;
  children: ReactNode;
  dxColor?: ButtonContainedPropsCustom["dxColor"];
}) {
  return (
    <Button
      dxVariant="contained"
      dxColor={dxColor}
      dxSize="md"
      type={type}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
}
