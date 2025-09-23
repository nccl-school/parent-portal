import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const VARS = {
  SECTION_NAME: "--home-section--name",
};

const styles = css`
  grid-area: ${`var(${VARS.SECTION_NAME})`};
  background: ${makeColor("white", { opacity: 0.6 })};
  padding: ${makeRem(16)};
  border-radius: ${makeRem(8)};
`;

export type HomeSectionProps = JSX.IntrinsicElements["article"] & {
  dxSectionName: string;
};

export function HomeSection({
  className,
  children,
  dxSectionName,
  ...restProps
}: HomeSectionProps) {
  return (
    <article
      {...restProps}
      className={classes(styles, className)}
      style={{
        [VARS.SECTION_NAME]: dxSectionName,
      }}
    >
      {children}
    </article>
  );
}
