import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  padding: ${makeRem(32)};
  place-content: center;
  max-width: 70ch;
  text-align: center;
  margin: 0 auto;
  color: ${makeColor("neutral-dark-1000")};
`;

export function MessageState(props: { children: ReactNode }) {
  return (
    <div className={styles}>
      <Typography dxVariant="body3" dxNode="div">
        {props.children}
      </Typography>
    </div>
  );
}
