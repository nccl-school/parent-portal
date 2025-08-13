import { useEffect, type ReactNode } from "react";
import { css } from "@linaria/core";
import type { ColorAndVariants } from "@nccl/theme";
import { makeColor, makeFontWeight, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import type { DefaultToastProps } from "./Toaster.js";

import { Button } from "../button/Button.js";
import { Typography } from "../typography/Typography.js";
import { Icon, type IconNames } from "../icons/Icon.js";

export const TOAST_VARIANTS = {
  SUCCESS: "success",
  ERROR: "error",
} as const;

type ToastVariants = (typeof TOAST_VARIANTS)[keyof typeof TOAST_VARIANTS];

export type ToastProps = DefaultToastProps & {
  variant: ToastVariants;
  title?: string;
  message: ReactNode;
  iconName?: IconNames;
  iconColor?: ColorAndVariants;
  disableAutoClose?: boolean;
} & ({ dismissal: "manual" } | { dismissal: "auto"; duration?: number });

const styles = css`
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slide-out {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  @keyframes progress {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }

  position: relative;
  background: ${makeColor("white")};
  border: 1px solid ${makeColor("light-500")};
  border-radius: ${makeRem(8)};
  box-shadow: var(--shadow-color) 0px 4px 12px;
  animation: slide-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;

  &.${TOAST_VARIANTS.ERROR} {
    --progress-color: ${makeColor("danger-200")};
    --shadow-color: ${makeColor("danger", { opacity: 0.2 })};
  }
  &.${TOAST_VARIANTS.SUCCESS} {
    --progress-color: ${makeColor("success-200")};
    --shadow-color: ${makeColor("success", { opacity: 0.2 })};
  }

  &.close {
    animation: slide-out 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &.countdown {
    &::after {
      content: "";
      position: absolute;
      bottom: ${makeRem(4)};
      left: 0;
      height: ${makeRem(4)};
      background: var(--progress-color);
      box-shadow:
        0 0 8px var(--progress-color),
        0 0 16px var(--progress-color);
      animation: progress var(--visible-duration) linear forwards;
    }
  }
`;

const contentStyles = css`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "icon title close"
    "icon message message";
  column-gap: ${makeRem(12)};
  row-gap: ${makeRem(8)};
  padding: ${makeRem(12)};
  background: linear-gradient(125deg, var(--shadow-color) 0%, #fff 60%);
`;
const iconStyles = css`
  grid-area: icon;
`;
const titleStyles = css`
  grid-area: title;
  font-weight: ${makeFontWeight("body-bold")} !important;
`;
const closeStyles = css`
  grid-area: close;
`;
const messageStyles = css`
  grid-area: message;
`;

const variantMap: {
  [key in ToastVariants]: {
    title: string;
    iconName: IconNames;
    color: ColorAndVariants;
  };
} = {
  error: {
    title: "Something went wrong",
    iconName: "alert-circle-solid-standard",
    color: "danger-700",
  },
  success: {
    title: "Success!",
    iconName: "checkmark-circle-01-solid-standard",
    color: "success-700",
  },
};

export function Toast(props: ToastProps) {
  const variantProps = variantMap[props.variant];
  const icon = props.iconName ?? variantProps.iconName;
  const iconColor = props.iconColor ?? variantProps.color;
  const autoDuration =
    props.dismissal === "auto" ? (props.duration ?? 3_000) : undefined;
  const onClose = props.onClose;

  useEffect(() => {
    if (!autoDuration) return;
    setTimeout(onClose, autoDuration);
  }, [autoDuration, onClose]);

  return (
    <div
      id={props.id}
      className={classes(styles, props.variant, { countdown: !!autoDuration })}
      style={
        autoDuration
          ? {
              // @ts-expect-error CSS custom properties are valid styles
              "--visible-duration": `${autoDuration / 1_000}s`,
            }
          : {}
      }
    >
      <div className={contentStyles}>
        <div className={iconStyles}>
          <Icon dxIcon={icon} dxColor={iconColor} dxSize={24} />
        </div>
        <Typography dxVariant="body1" dxNode="div" className={titleStyles}>
          {props.title ?? variantProps.title}
        </Typography>
        <Button
          className={closeStyles}
          dxVariant="icon"
          dxIcon="cancel-01-solid-standard"
          onClick={() => props.onClose()}
        />
        <div className={messageStyles}>
          {typeof props.message === "string" ? (
            <Typography dxNode="p" dxVariant="body3">
              {props.message}
            </Typography>
          ) : (
            props.message
          )}
        </div>
      </div>
    </div>
  );
}
