import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeRem, makeReset, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";

const stylesBase = css`
  width: 100%;
  ${makeResponsive({ to: "laptop" })} {
    & + & {
      margin-top: ${makeRem(16)};
    }
  }

  ${makeResponsive({ from: "laptop" })} {
    & + & {
      margin-top: ${makeRem(24)};
    }
  }
`;

const stylesTyp = css`
  text-transform: uppercase;
  color: ${makeColor("neutral-dark-100")};
  letter-spacing: ${makeRem(1.6)};
  line-height: ${makeRem(32)} !important;
`;

const stylesUl = css`
  ${makeReset("ul")};

  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeRem(8)};
    background: ${makeColor("white")};
    border-radius: ${makeRem(8)};
  }

  a {
    color: unset;
    text-decoration: unset;
  }
`;

export function NavGroup({
  children,
  className,
  dxTitle,
  ...restProps
}: JSX.IntrinsicElements["div"] & { dxTitle: string }) {
  return (
    <div {...restProps} className={classes(stylesBase, className)}>
      <Typography dxVariant="label" dxNode="div" className={stylesTyp}>
        {dxTitle}
      </Typography>
      <ul className={stylesUl}>{children}</ul>
    </div>
  );
}
