import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type PopoverPropsNative = JSX.IntrinsicElements["div"];
// export type PopoverPropsCustom = {};
export type PopoverProps = PopoverPropsNative;

const styles = css`
  --shadow-color: 0deg 0% 63%;
  --shadow-elevation-high:
    0.1px 0.3px 0.4px hsl(var(--shadow-color) / 0.34),
    0.8px 1.5px 1.9px -0.4px hsl(var(--shadow-color) / 0.34),
    1.4px 2.8px 3.5px -0.7px hsl(var(--shadow-color) / 0.34),
    2.3px 4.7px 5.9px -1.1px hsl(var(--shadow-color) / 0.34),
    3.7px 7.4px 9.3px -1.4px hsl(var(--shadow-color) / 0.34),
    5.8px 11.6px 14.6px -1.8px hsl(var(--shadow-color) / 0.34),
    8.9px 17.7px 22.3px -2.1px hsl(var(--shadow-color) / 0.34),
    13.1px 26.1px 32.9px -2.5px hsl(var(--shadow-color) / 0.34);

  // Closed styles
  display: none;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.15s allow-discrete;
  box-shadow: var(--shadow-elevation-high);
  border: 0;
  margin: 0;
  border: 1px solid ${makeColor("neutral-light-50")};
  padding: ${makeRem(4)};
  border-radius: ${makeRem(8)};

  // When the popover is opened
  &:popover-open {
    display: initial;
    opacity: 1;
    transform: scale(1);
  }

  @starting-style {
    &:popover-open {
      opacity: 0;
      transform: scale(0.9);
    }
  }
`;

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover({ children, className, ...restProps }, ref) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </div>
    );
  }
);
