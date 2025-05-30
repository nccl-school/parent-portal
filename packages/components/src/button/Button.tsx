import { forwardRef } from "react";
import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";

import { ButtonIcon, type ButtonIconProps } from "./ButtonIcon.js";
import type {
  ButtonContainedProps,
  ButtonContainedVariants,
} from "./ButtonContained.js";
import { ButtonContained } from "./ButtonContained.js";

type ButtonVariantIcon =
  | ({ dxVariant: "icon" } & ButtonIconProps)
  | ({ dxVariant: ButtonContainedVariants } & ButtonContainedProps);

export type ButtonProps = ButtonVariantIcon;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    switch (props.dxVariant) {
      case "icon": {
        const { dxVariant, ...restProps } = props;
        return <ButtonIcon {...restProps} ref={ref} />;
      }

      case "contained":
      case "outlined": {
        return <ButtonContained {...props} ref={ref} />;
      }

      default:
        exhaustiveMatchGuard(props);
    }
  }
);
