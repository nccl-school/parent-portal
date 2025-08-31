import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const stylesBase = css`
  background: ${makeColor("white")};
  border-radius: ${makeRem(8)};

  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeRem(16)} 0;

    & > * {
      padding-left: ${makeRem(16)} !important;
      padding-right: ${makeRem(16)} !important;
    }

    & + & {
      margin-top: ${makeRem(24)};
    }
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: ${makeRem(32)} 0;

    & > * {
      padding-left: ${makeRem(32)} !important;
      padding-right: ${makeRem(32)} !important;
    }

    & + & {
      margin-top: ${makeRem(48)};
    }
  }
`;

export type AccountPageSectionProps = JSX.IntrinsicElements["section"];

export function AccountPageSection({
  children,
  className,
  ...restProps
}: AccountPageSectionProps) {
  return (
    <section className={classes(stylesBase, className)} {...restProps}>
      {children}
    </section>
  );
}
