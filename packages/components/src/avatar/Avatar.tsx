import { css } from "@linaria/core";
import {
  makeColor,
  makeFontFamily,
  makeRem,
  type ColorAndVariants,
} from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef, useMemo } from "react";

export type AvatarPropsNative = Omit<JSX.IntrinsicElements["div"], "children">;
export type AvatarPropsCustom = {
  dxSrc?: string;
  dxFirstName: string;
  dxLastName?: string;
  /**
   * @default primary
   */
  dxBgColor?: ColorAndVariants;
  dxSize: "sm" | "md" | "lg" | "xl" | number;
};
export type AvatarProps = AvatarPropsNative & AvatarPropsCustom;

const styles = css`
  --avatar-size: ${makeRem(24)};
  --avatar-bg-color: ${makeColor("neutral-light-50")};

  &.sm {
    --avatar-size: ${makeRem(16)};
  }
  &.md {
    --avatar-size: ${makeRem(24)};
  }
  &.lg {
    --avatar-size: ${makeRem(32)};
  }
  &.xl {
    --avatar-size: ${makeRem(42)};
  }

  border-radius: 50%;
  line-height: 100%;
  overflow: hidden;
  font-size: calc(var(--avatar-size) - 8px);
  height: var(--avatar-size);
  aspect-ratio: 1 / 1;
  display: grid;
  place-content: center;
  border: 1px solid ${makeColor("tertiary-900")};
  position: relative;

  & > * {
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    border: 1px solid white;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  & > div {
    font-family: ${makeFontFamily("body")};
    position: absolute;
    translate: 50%, 50%;
    background: var(--avatar-bg-color);
    display: grid;
    place-content: center;
    width: 100%;
    font-size: 0.5em;
  }
`;

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    className,
    dxSrc,
    dxFirstName,
    dxLastName,
    dxSize,
    dxBgColor,
    style,
    ...restProps
  },
  ref
) {
  const initials = useMemo(() => {
    const firstLetter = dxFirstName.split("")[0];
    if (!dxLastName) {
      return firstLetter;
    }
    const lastLetter = dxLastName.split("")[0];
    return `${firstLetter}${lastLetter}`;
  }, [dxFirstName, dxLastName]);

  return (
    <div
      {...restProps}
      className={classes(
        className,
        styles,
        typeof dxSize === "string" ? dxSize : undefined
      )}
      style={{
        ...style,
        // @ts-expect-error Custom properties are OK
        ["--avatar-size"]:
          typeof dxSize === "number" ? makeRem(dxSize) : undefined,
        ["--avatar-bg-color"]:
          typeof dxBgColor !== "undefined" ? makeColor(dxBgColor) : undefined,
      }}
      ref={ref}
    >
      {dxSrc ? <img src={dxSrc} alt={dxFirstName} /> : <div>{initials}</div>}
    </div>
  );
});
