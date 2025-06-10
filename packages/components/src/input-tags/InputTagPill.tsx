import { css } from "@linaria/core";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import type { MouseEventHandler } from "react";

import type { PickNativeProps } from "../types/index.js";
import { Icon } from "../icons/Icon.js";
import { Typography } from "../typography/Typography.js";

export type InputTagProps = PickNativeProps<"span", "ref"> & {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const styles = css`
  display: inline-flex;
  align-items: center;
  height: ${makeRem(28)};
  border-radius: ${makeRem(8)};
  padding-left: ${makeRem(8)};
  background-color: ${makeColor("tertiary-50")};
  color: ${makeColor("tertiary-1200")};

  button {
    ${makeReset("button")};
    height: 100%;
    aspect-ratio: 1 / 1;
    display: grid;
    place-content: center;

    &:focus {
      outline: none;
      border: 1px solid ${makeColor("secondary")};
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }
  }
`;

export function InputTagPill({ ref, children, onClick }: InputTagProps) {
  return (
    <span ref={ref} className={styles}>
      <Typography dxNode="span" dxVariant="label">
        {children}
      </Typography>
      <button onClick={onClick} id={children}>
        <Icon dxIcon="cancel-01-solid-standard" dxSize={12} />
      </button>
    </span>
  );
}
