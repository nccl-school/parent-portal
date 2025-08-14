import type { JSX } from "react";
import { forwardRef } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";

export type ProgressProps = JSX.IntrinsicElements["progress"] & {
  min: number;
  max: number;
  children: string;
};

const stylesLabel = css`
  & > span {
    display: none;
  }
`;

export const styles = css`
  accent-color: ${makeColor("secondary")};
  transition: all 0.3s ease-in-out;
  width: 100%;

  position: relative;
  border: none;
  background: none;
  height: ${makeRem(8)};

  &::-webkit-progress-bar,
  &::-webkit-progress-inner-element,
  &::-webkit-progress-value {
    background-color: transparent;
  }

  &::before,
  &::after {
    border-radius: ${makeRem(8)};
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: ${makeColor("tertiary")};
    transition: all 0.3s ease-in-out;
    width: var(--progress-value);
    z-index: 10;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${makeColor("light-300")};
  }
`;

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(
  function Progress({ children, value, style, ...restProps }, ref) {
    return (
      <label className={stylesLabel}>
        <span>{children}</span>
        <progress
          className={styles}
          {...restProps}
          value={value}
          ref={ref}
          style={{
            ...style,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            "--progress-value": `${value}%`,
          }}
        />
      </label>
    );
  }
);
