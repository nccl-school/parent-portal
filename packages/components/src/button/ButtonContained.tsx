import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";
import {
  makeColor,
  makeFontFamily,
  makeFontWeight,
  makeRem,
  makeReset,
} from "@nccl/theme";

import { fontSizeStyles, type IntrinsicSizes } from "../shared/index.js";
import { Icon, type IconNames } from "../icons/Icon.js";

export type ButtonContainedVariants = "contained" | "outlined";
export type ButtonContainedPropsNative = JSX.IntrinsicElements["button"];
export type ButtonContainedPropsCustom = {
  /**
   * The style of the button
   * @default contained
   */
  dxVariant?: ButtonContainedVariants;
  /**
   * The size of the button
   * @default md
   */
  dxSize: IntrinsicSizes;
  /**
   * The color of the button
   * @default primary
   */
  dxColor?: "primary" | "secondary" | "tertiary" | "alt" | "danger" | "success";
  /**
   * An icon to add the start of the button
   */
  dxStartIcon?: IconNames;
};
export type ButtonContainedProps = ButtonContainedPropsNative &
  ButtonContainedPropsCustom;

const styles = css`
  ${makeReset("button")};
  padding: 0 1em;
  height: 2.5em;
  display: flex;
  align-items: center;
  border-radius: ${makeRem(8)};
  font-family: ${makeFontFamily("body")};
  transition: all 0.15s ease-in-out;
  outline-offset: 2px;
  font-weight: ${makeFontWeight("body-semiBold")};
  cursor: pointer;
  position: relative;
  outline-color: transparent;

  &:active {
    transform: scale(0.96);
  }
  &:focus {
    outline-width: 2px;
    outline-style: solid;
  }

  &.i {
    &.start {
      padding-left: 0.25em;
    }
    & > div {
      height: inherit;
      aspect-ratio: 1 / 1;
      display: grid;
      place-content: center;
      font-size: 1em;
    }
  }

  &.primary {
    color: ${makeColor("primary-1200")};
    &.contained {
      background: ${makeColor("primary-200")};
      &:hover {
        background: ${makeColor("primary-400")};
      }
    }
    &.outlined {
      border: 2px solid ${makeColor("primary-200")};
      &:hover {
        border-color: ${makeColor("primary-400")};
      }
    }

    &:focus {
      outline-color: ${makeColor("primary-1200")};
    }
  }

  &.secondary {
    color: ${makeColor("secondary-1200")};
    &.contained {
      background: ${makeColor("secondary-200")};
      &:hover {
        background: ${makeColor("secondary-400")};
      }
    }
    &.outlined {
      border: 2px solid ${makeColor("secondary-200")};
      &:hover {
        border-color: ${makeColor("secondary-400")};
      }
    }
    &:focus {
      outline-color: ${makeColor("secondary-1200")};
    }
  }

  &.tertiary {
    color: ${makeColor("tertiary-1200")};
    &.contained {
      background: ${makeColor("tertiary-200")};
      &:hover {
        background: ${makeColor("tertiary-400")};
      }
    }
    &.outlined {
      border: 2px solid ${makeColor("tertiary-200")};
      &:hover {
        border-color: ${makeColor("tertiary-400")};
      }
    }
    &:focus {
      outline-color: ${makeColor("tertiary-1200")};
    }
  }

  &.alt {
    color: ${makeColor("alt-900")};
    &.contained {
      background: ${makeColor("alt-200")};
      &:hover {
        background: ${makeColor("alt-400")};
      }
    }
    &.outlined {
      border: 2px solid ${makeColor("alt-200")};
      &:hover {
        border-color: ${makeColor("alt-400")};
      }
    }
    &:focus {
      outline-color: ${makeColor("alt-900")};
    }
  }

  &.danger {
    color: ${makeColor("danger-900")};
    &.contained {
      background: ${makeColor("danger-200")};
      &:hover {
        background: ${makeColor("danger-400")};
      }
    }
    &.outlined {
      border: 2px solid ${makeColor("danger-200")};
      &:hover {
        border-color: ${makeColor("danger-400")};
      }
    }
    &:focus {
      outline-color: ${makeColor("danger-900")};
    }
  }

  &.success {
    color: ${makeColor("success-900")};
    &.contained {
      background: ${makeColor("success-200")};
      &:hover {
        background: ${makeColor("success-400")};
      }
    }
    &.outlined {
      border: 2px solid ${makeColor("success-200")};
      &:hover {
        border-color: ${makeColor("success-400")};
      }
    }
    &:focus {
      outline-color: ${makeColor("success-900")};
    }
  }
`;

export const ButtonContained = forwardRef<
  HTMLButtonElement,
  ButtonContainedProps
>(function ButtonContained(
  {
    children,
    className,
    dxVariant = "contained",
    dxSize = "md",
    dxColor = "primary",
    dxStartIcon,
    ...restProps
  },
  ref
) {
  return (
    <button
      {...restProps}
      className={classes(
        className,
        styles,
        dxSize,
        dxColor,
        dxVariant,
        fontSizeStyles,
        {
          "i start": !!dxStartIcon,
        }
      )}
      ref={ref}
    >
      {dxStartIcon && <Icon dxIcon={dxStartIcon} />}
      {children}
    </button>
  );
});
