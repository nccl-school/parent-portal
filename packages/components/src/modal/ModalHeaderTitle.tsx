import type { JSX, ReactNode } from "react";
import { forwardRef } from "react";

import { Typography } from "../typography/Typography.js";

export type ModalHeaderTitlePropsNative = JSX.IntrinsicElements["div"];
export type ModalHeaderTitlePropsCustom = {
  children: ReactNode;
};
export type ModalHeaderTitleProps = ModalHeaderTitlePropsNative &
  ModalHeaderTitlePropsCustom;

export const ModalHeaderTitle = forwardRef<
  HTMLDivElement,
  ModalHeaderTitleProps
>(function ModalHeaderTitle({ children, ...restProps }, ref) {
  return (
    <Typography dxVariant="heading4" dxNode="div" {...restProps} ref={ref}>
      {children}
    </Typography>
  );
});
