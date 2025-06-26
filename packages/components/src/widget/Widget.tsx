import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type WidgetPropsNative = JSX.IntrinsicElements["article"];
export type WidgetPropsCustom = {
  dxVariant?: "basic";
};
export type WidgetProps = WidgetPropsNative & WidgetPropsCustom;

const styles = css`
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  border-radius: ${makeRem(8)};
  padding: ${makeRem(24)} 0;

  --shadow-color: 170deg 24% 54%;
  --shadow-elevation-low:
    0.2px 0.1px 0.3px hsl(var(--shadow-color) / 0.4),
    0.3px 0.2px 0.4px -1.2px hsl(var(--shadow-color) / 0.41),
    0.7px 0.6px 1.1px -2.4px hsl(var(--shadow-color) / 0.42);
  --shadow-elevation-medium:
    0.2px 0.1px 0.3px hsl(var(--shadow-color) / 0.42),
    0.5px 0.5px 0.8px -0.8px hsl(var(--shadow-color) / 0.43),
    1.4px 1.2px 2.1px -1.6px hsl(var(--shadow-color) / 0.44),
    3.4px 2.9px 5.1px -2.4px hsl(var(--shadow-color) / 0.44);
  --shadow-elevation-high:
    0.2px 0.1px 0.3px hsl(var(--shadow-color) / 0.44),
    1.2px 1px 1.8px -0.4px hsl(var(--shadow-color) / 0.45),
    2.4px 2.1px 3.6px -0.8px hsl(var(--shadow-color) / 0.45),
    4.2px 3.6px 6.3px -1.2px hsl(var(--shadow-color) / 0.46),
    7.1px 6.1px 10.7px -1.6px hsl(var(--shadow-color) / 0.46),
    11.6px 10px 17.5px -2px hsl(var(--shadow-color) / 0.47),
    18.3px 15.7px 27.5px -2.4px hsl(var(--shadow-color) / 0.48);

  box-shadow: var(--shadow-elevation-medium);
`;

export const Widget = forwardRef<HTMLDivElement, WidgetProps>(function Widget(
  { children, className, dxVariant = "basic", ...restProps },
  ref
) {
  return (
    <article
      {...restProps}
      className={classes(styles, className, dxVariant)}
      ref={ref}
    >
      {children}
    </article>
  );
});
