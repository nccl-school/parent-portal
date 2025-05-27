import { forwardRef, lazy, Suspense, useMemo, type JSX } from "react";
import { css } from "@linaria/core";
import type { ColorAndVariants } from "@nccl/theme";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import { iconManifest } from "./_generated/index.manifest.js";

export type IconNames = keyof typeof iconManifest;

export type IconPropsNative = Omit<JSX.IntrinsicElements["div"], "children">;
export type IconPropsCustom = {
  dxIcon: IconNames;
  /**
   * The size of the icon
   * @default 24
   */
  dxSize?: number;
  /**
   * The color of the icon
   * @default inherit
   */
  dxColor?: ColorAndVariants | "inherit";
};
export type IconProps = IconPropsNative & IconPropsCustom;

const styles = css`
  --icon-size: ${makeRem(24)};
  --icon-color: ${makeColor("neutral-dark")};

  font-size: var(--icon-size);
  color: var(--icon-color);

  height: var(--icon-size);
  aspect-ratio: 1 / 1;
`;

function IconFallback() {
  return <span className={`icon icon--loading`} />;
}

const lazyIconManifest = Object.fromEntries(
  Object.entries(iconManifest).map(([name, importFn]) => [name, lazy(importFn)])
);

export const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  {
    className,
    dxIcon,
    dxSize = 24,
    style = {},
    dxColor = "inherit",
    ...restProps
  },
  ref
) {
  const inlineStyles = useMemo<React.CSSProperties>(() => {
    return {
      ...style,
      "--icon-size": `${dxSize}px`,
      "--icon-color": dxColor === "inherit" ? "inherit" : makeColor(dxColor),
    };
  }, [dxColor, dxSize, style]);

  const LazyIcon = lazyIconManifest[dxIcon];
  return (
    <div
      {...restProps}
      className={classes(className, styles)}
      style={inlineStyles}
      ref={ref}
    >
      <Suspense fallback={<IconFallback />}>
        <LazyIcon className="icon" aria-hidden="true" fill="currentColor" />
      </Suspense>
    </div>
  );
});
