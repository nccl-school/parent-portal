import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

export type IntrinsicSizes = "sm" | "md" | "lg";

export const fontSizeStyles = css`
  &.sm {
    font-size: ${makeRem(12)};
  }

  &.md {
    font-size: ${makeRem(16)};
  }

  &.lg {
    font-size: ${makeRem(20)};
  }
`;
