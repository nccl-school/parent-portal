import { css } from "@linaria/core";
import { makeFontFamily, makeFontWeight, makeRem } from "@nccl/theme";
import { classes, exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type TypographyProps = {
  dxVariant:
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "body1"
    | "body2"
    | "body3"
    | "caption"
    | "label";
} & (
  | (JSX.IntrinsicElements["h1"] & { dxNode: "h1" })
  | (JSX.IntrinsicElements["h2"] & { dxNode: "h2" })
  | (JSX.IntrinsicElements["h3"] & { dxNode: "h3" })
  | (JSX.IntrinsicElements["h4"] & { dxNode: "h4" })
  | (JSX.IntrinsicElements["h5"] & { dxNode: "h5" })
  | (JSX.IntrinsicElements["h6"] & { dxNode: "h6" })
  | (JSX.IntrinsicElements["p"] & { dxNode: "p" })
  | (JSX.IntrinsicElements["div"] & { dxNode: "div" })
  | (JSX.IntrinsicElements["span"] & { dxNode: "span" })
);

const factor = 1.2;
const baseFontSize = 16;
const baselineGrid = 4;

function makeFontSize(power: number, percent: number) {
  const fontSizeRaw = baseFontSize * Math.pow(factor, power);
  const snappedLineHeight =
    Math.ceil((fontSizeRaw * (percent / 100)) / baselineGrid) * baselineGrid;

  return `
    font-size: ${makeRem(fontSizeRaw)};
    line-height: ${makeRem(snappedLineHeight)}
  `;
}

const styles = css`
  margin: 0;

  &.heading1 {
    font-family: ${makeFontFamily("heading")};
    font-weight: ${makeFontWeight("heading-bold")};
    ${makeFontSize(4, 110)};
  }

  &.heading2 {
    ${makeFontSize(3, 110)};
    font-family: ${makeFontFamily("heading")};
    font-weight: ${makeFontWeight("heading-semiBold")};
  }

  &.heading3 {
    ${makeFontSize(2, 110)};
    font-family: ${makeFontFamily("heading")};
    font-weight: ${makeFontWeight("heading-medium")};
  }

  &.heading4 {
    ${makeFontSize(1, 110)};
    font-family: ${makeFontFamily("heading")};
    font-weight: ${makeFontWeight("heading-bold")};
  }

  &.heading5 {
    ${makeFontSize(0, 110)};
    font-family: ${makeFontFamily("heading")};
    font-weight: ${makeFontWeight("heading-semiBold")};
  }

  &.body1 {
    ${makeFontSize(0, 150)};
    font-family: ${makeFontFamily("body")};
    font-weight: ${makeFontWeight("body-regular")};
  }

  &.body2 {
    ${makeFontSize(0, 150)};
    font-family: ${makeFontFamily("body")};
    font-weight: ${makeFontWeight("body-regular")};
  }

  &.body3 {
    ${makeFontSize(-0.5, 110)};
    font-family: ${makeFontFamily("body")};
    font-weight: ${makeFontWeight("body-regular")};
  }

  &.label {
    ${makeFontSize(-1, 150)};
    font-family: ${makeFontFamily("body")};
    font-weight: ${makeFontWeight("body-semiBold")};
  }

  &.caption {
    ${makeFontSize(-2, 150)};
    font-family: ${makeFontFamily("body")};
    font-weight: ${makeFontWeight("body-bold")};
  }
`;

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  function Typography(props, ref) {
    switch (props.dxNode) {
      case "h1": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <h1
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "h2": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <h2
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "h3": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <h3
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "h4": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <h4
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "h5": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <h5
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "h6": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <h6
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "p": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <p
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "div": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <div
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      case "span": {
        const { dxNode, dxVariant, className, ...restProps } = props;
        return (
          <span
            {...restProps}
            className={classes(className, styles, dxVariant)}
            ref={ref}
          />
        );
      }

      default:
        return exhaustiveMatchGuard(props);
    }
  }
);
