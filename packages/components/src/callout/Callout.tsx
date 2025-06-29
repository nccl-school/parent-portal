import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";

import type { PickNativeProps } from "../types/index.js";
import type { IconNames } from "../icons/Icon.js";
import { Icon } from "../icons/Icon.js";
import { Typography } from "../typography/Typography.js";

export type CalloutVariants =
  | "danger"
  | "warning"
  | "success"
  | "info"
  | "note";
type CalloutPropsNative = PickNativeProps<
  "div",
  "ref" | "className" | "children"
>;
type CalloutPropsCustom = {
  variant: CalloutVariants;
  /**
   * Hides the predefined icon so only text displays
   */
  omitIcon?: boolean;
  title?: string;
  description: string;
};
export type CalloutProps = CalloutPropsNative & CalloutPropsCustom;

const variantIcons: { [key in CalloutVariants]: IconNames } = {
  danger: "alert-diamond-stroke-standard",
  warning: "alert-02-stroke-standard",
  success: "smile-stroke-standard",
  info: "information-circle-stroke-standard",
  note: "sticky-note-01-stroke-standard",
};

const styles = css`
  padding: ${makeRem(12)} ${makeRem(16)};
  border-width: 2px;
  border-style: solid;
  border-radius: ${makeRem(8)};
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: ${makeRem(16)};
  align-items: center;

  .co-desc {
    color: ${makeColor("neutral-dark-400")} !important;
  }

  &.danger {
    border-color: ${makeColor("danger")};
    background-color: ${makeColor("danger-50")};
  }
  &.warning {
    border-color: ${makeColor("warning")};
    background-color: ${makeColor("warning-50")};
  }
  &.success {
    border-color: ${makeColor("success")};
    background-color: ${makeColor("success-50")};
  }
  &.info {
    border-color: ${makeColor("neutral-light")};
    background-color: ${makeColor("neutral-light-50")};
  }
  &.note {
    border-color: ${makeColor("hover")};
    background-color: ${makeColor("hover-100")};
  }
`;

export function Callout({
  className,
  ref,
  variant,
  title,
  description,
  omitIcon,
  children,
}: CalloutProps) {
  return (
    <div ref={ref} className={classes(styles, variant, className)}>
      <div className="co-icon">
        {!omitIcon && (
          <Icon
            dxIcon={variantIcons[variant]}
            dxSize={24}
            dxColor="neutral-dark"
          />
        )}
      </div>
      <div>
        {title && (
          <Typography
            dxVariant="heading5"
            dxNode="div"
            style={{
              marginBottom: makeRem(4),
            }}
          >
            {title}
          </Typography>
        )}
        <Typography dxVariant="body3" dxNode="div" className="co-desc">
          {description}
        </Typography>
      </div>
      <div>{children}</div>
    </div>
  );
}
