import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import type { ReactNode } from "react";

const styles = css`
  padding: ${makeRem(32)};
  place-content: center;
  gap: ${makeRem(16)};
  max-width: 70ch;
  text-align: center;
  margin: 0 auto;
`;

export function LoadingState(props: { children: ReactNode }) {
  return (
    <div className={styles}>
      <Typography dxVariant="body2" dxNode="div">
        {props.children}
      </Typography>
    </div>
  );
}
