import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const CARD_VARIANTS = {
  borderless: "borderless",
  contained: "contained",
} as const;
type CardVariants = keyof typeof CARD_VARIANTS;

export type CardProps = JSX.IntrinsicElements["div"] & {
  dxVariant?: CardVariants;
};

const styles = css`
  border: 1px solid ${makeColor("neutral-light-100")};
  display: block;
  border-radius: ${makeRem(8)};
  transition: all 0.15s ease-in-out;
  padding: ${makeRem(16)};
`;

const styleVariants: { [key in CardVariants]: ReturnType<typeof css> } = {
  borderless: css`
    border-color: transparent;
  `,
  contained: css`
    border-color: ${makeColor("neutral-light-100")};
  `,
};

export function Card({ className, children, dxVariant }: CardProps) {
  return (
    <div
      className={classes(
        className,
        styles,
        styleVariants[CARD_VARIANTS[dxVariant ?? "borderless"]]
      )}
    >
      {children}
    </div>
  );
}
