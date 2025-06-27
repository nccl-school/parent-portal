import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import {
  makeColor,
  makeFontWeight,
  makeRem,
  makeResponsive,
} from "@nccl/theme";

import { Typography } from "../typography/Typography.js";

export type ActionCardPropsNative = Omit<
  JSX.IntrinsicElements["div"],
  "children"
>;
export type ActionCardPropsCustom = {
  /**
   * The size of the card
   * @default md
   */
  dxCardSize: "sm" | "md" | "lg";
  dxTitle: string;
  dxDescription: string;
  dxImgSrc: string;
  dxImgAlt: string;
};
export type ActionCardProps = ActionCardPropsNative & ActionCardPropsCustom;

const styles = css`
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  transition: all 0.15s ease-in-out;
  text-align: center;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);

  img {
    width: 100%;
  }

  .ac-title {
    font-weight: ${makeFontWeight("body-bold")} !important;
    text-align: left;
  }

  .ac-desc {
    color: ${makeColor("neutral-dark-200")} !important;
    font-weight: ${makeFontWeight("body-regular")} !important;
    text-align: left;
  }

  &:active {
    transform: scale(0.96);
  }
  &:has(a:focus),
  &:hover {
    background: rgb(255, 255, 255);
    transform: scale(1.05);
  }
  padding: ${makeRem(32)};

  &.sm {
    border-radius: ${makeRem(8)};

    ${makeResponsive({ to: "laptop" })} {
      img {
        margin-bottom: ${makeRem(4)};
        max-width: ${makeRem(80)};
      }
    }

    ${makeResponsive({ from: "laptop" })} {
      img {
        margin-bottom: ${makeRem(8)};
        max-width: ${makeRem(100)};
      }
    }
  }
  &.md {
    border-radius: ${makeRem(12)};

    ${makeResponsive({ to: "laptop" })} {
      img {
        margin-bottom: ${makeRem(4)};
        max-width: ${makeRem(80)};
      }
    }

    ${makeResponsive({ from: "laptop" })} {
      img {
        margin-bottom: ${makeRem(12)};
        max-width: ${makeRem(120)};
      }
    }
  }
  &.lg {
    border-radius: ${makeRem(16)};

    ${makeResponsive({ to: "laptop" })} {
      img {
        margin-bottom: ${makeRem(12)};
        max-width: ${makeRem(120)};
      }
    }

    ${makeResponsive({ from: "laptop" })} {
      img {
        margin-bottom: ${makeRem(16)};
        max-width: ${makeRem(140)};
      }
    }
  }
`;

export const ActionCard = forwardRef<HTMLDivElement, ActionCardProps>(
  function ActionCard(
    {
      className,
      dxTitle,
      dxDescription,
      dxImgAlt,
      dxImgSrc,
      dxCardSize = "sm",
      ...restProps
    },
    ref
  ) {
    return (
      <div
        {...restProps}
        className={classes(styles, className, dxCardSize)}
        ref={ref}
      >
        <img src={dxImgSrc} alt={dxImgAlt} />
        <Typography dxNode="div" dxVariant="body1" className={"ac-title"}>
          {dxTitle}
        </Typography>
        <Typography dxNode="div" dxVariant="label" className={"ac-desc"}>
          {dxDescription}
        </Typography>
      </div>
    );
  }
);
