import type { JSX } from "react";
import { forwardRef } from "react";
import { classes } from "@stratum-ui/core/utils";

import { Icon, type IconProps } from "../icons/Icon.js";

export type PopoverMenuItemIconPropsNative = JSX.IntrinsicElements["div"];
export type PopoverMenuItemIconPropsCustom = Omit<
  IconProps,
  "dxSize" | "dxColor"
>;
export type PopoverMenuItemIconProps = PopoverMenuItemIconPropsNative &
  PopoverMenuItemIconPropsCustom;

export const PopoverMenuItemIcon = forwardRef<
  HTMLDivElement,
  PopoverMenuItemIconProps
>(function PopoverMenuItemIcon(
  { children, className, dxIcon, ...restProps },
  ref
) {
  return (
    <div {...restProps} className={classes(className)} ref={ref}>
      <Icon dxIcon={dxIcon} dxSize={20} />
      {children}
    </div>
  );
});
