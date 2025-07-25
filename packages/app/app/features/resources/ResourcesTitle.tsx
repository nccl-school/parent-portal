import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeResponsive, makeRem } from "@nccl/theme";
import type { ReactNode } from "react";

const stylesTitle = css`
  display: grid;
  grid-template-columns: 1fr auto;

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeRem(32)};

    & > div {
      display: flex;
      align-items: center;
      gap: ${makeRem(8)};
    }
  }
`;

export function ResourcesTitle({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={stylesTitle}>
      <Typography dxNode="div" dxVariant="heading4">
        {title}
      </Typography>
      <div>{children}</div>
    </div>
  );
}
