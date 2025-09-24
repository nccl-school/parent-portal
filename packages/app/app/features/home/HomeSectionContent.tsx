import { css } from "@linaria/core";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { makeRem } from "@nccl/theme";

const styles = css`
  padding: 0 ${makeRem(16)};
`;

export type HomeSectionContentProps = JSX.IntrinsicElements["div"];

export function HomeSectionContent({
  className,
  children,
  ...restProps
}: HomeSectionContentProps) {
  return (
    <div {...restProps} className={classes(styles, className)}>
      {children}
    </div>
  );
}
