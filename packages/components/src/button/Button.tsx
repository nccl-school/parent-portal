import { forwardRef } from "react";
import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";

import { ButtonIcon, type ButtonIconProps } from "./ButtonIcon.js";

type ButtonVariantIcon = ButtonIconProps & { dxVariant: "icon" };
// type ButtonVariantContained =

export type ButtonProps = ButtonVariantIcon;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    switch (props.dxVariant) {
      case "icon": {
        const { dxVariant, ...restProps } = props;
        return <ButtonIcon {...restProps} ref={ref} />;
      }

      default:
        exhaustiveMatchGuard(props.dxVariant);
    }
  }
);
