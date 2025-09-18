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
import { Icon } from "../icons/Icon.js";

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
  ${makeResponsive({ to: "tablet" })} {
    display: grid;
    grid-template-columns: auto 1fr auto;
    padding: ${makeRem(8)} ${makeRem(16)};
    min-height: ${makeRem(100)};
    gap: ${makeRem(16)};
    align-items: center;
    border-bottom: 1px solid ${makeColor("light-400")};
  }

  ${makeResponsive({ from: "tablet" })} {
    text-align: center;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.15s ease-in-out;
    padding: ${makeRem(32)};
    box-shadow:
      rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    &:active {
      transform: scale(0.96);
    }
    &:has(a:focus),
    &:hover {
      background: rgb(255, 255, 255);
      transform: scale(1.05);
    }
  }

  &.sm {
    border-radius: ${makeRem(8)};
  }
  &.md {
    border-radius: ${makeRem(12)};
  }
  &.lg {
    border-radius: ${makeRem(16)};
  }
`;

const imgStyles = css`
  &.sm {
    ${makeResponsive({ to: "tablet" })} {
      max-width: ${makeRem(36)};
    }

    ${makeResponsive({ from: "tablet" })} {
      margin-bottom: ${makeRem(8)};
      max-width: ${makeRem(100)};
    }
  }
  &.md {
    ${makeResponsive({ to: "tablet" })} {
      max-width: ${makeRem(48)};
    }

    ${makeResponsive({ from: "tablet" })} {
      margin-bottom: ${makeRem(12)};
      max-width: ${makeRem(120)};
    }
  }
  &.lg {
    ${makeResponsive({ to: "tablet" })} {
      max-width: ${makeRem(52)};
    }

    ${makeResponsive({ from: "tablet" })} {
      margin-bottom: ${makeRem(16)};
      max-width: ${makeRem(140)};
    }
  }
`;
const titleStyles = css`
  font-weight: ${makeFontWeight("body-bold")} !important;
  text-align: left;
`;
const descStyles = css`
  color: ${makeColor("neutral-dark-200")} !important;
  font-weight: ${makeFontWeight("body-regular")} !important;
  text-align: left;
`;
const arrowStyles = css`
  ${makeResponsive({ from: "tablet" })} {
    display: none;
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
        <img
          src={dxImgSrc}
          alt={dxImgAlt}
          className={classes(imgStyles, dxCardSize)}
        />
        <div>
          <Typography dxNode="div" dxVariant="body1" className={titleStyles}>
            {dxTitle}
          </Typography>
          <Typography dxNode="div" dxVariant="label" className={descStyles}>
            {dxDescription}
          </Typography>
        </div>
        <Icon
          className={arrowStyles}
          dxIcon="arrow-right-01-stroke-standard"
          dxSize={24}
          dxColor="neutral-light-900"
        />
      </div>
    );
  }
);
