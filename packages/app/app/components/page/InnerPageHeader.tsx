import { forwardRef, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";
import { Typography } from "@nccl/components";
import { css } from "@linaria/core";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";

export type InnerPageHeaderPropsNative = JSX.IntrinsicElements["div"];
export type InnerPageHeaderPropsCustom = {
  dxTitle: string;
  dxSubtitle?: string;
};
export type InnerPageHeaderProps = InnerPageHeaderPropsNative &
  InnerPageHeaderPropsCustom;

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeCustom("page--gutter-mobile")};
  }
  ${makeResponsive({ from: "laptop" })} {
    padding: ${makeCustom("page--gutter-desktop")};
  }

  & > .subtitle {
    margin-top: ${makeRem(8)};
  }
`;

export const InnerPageHeader = forwardRef<HTMLDivElement, InnerPageHeaderProps>(
  function InnerPageHeader(
    { children, className, dxTitle, dxSubtitle, ...restProps },
    ref
  ) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        <div>
          <Typography dxVariant="heading2" dxNode="h3">
            {dxTitle}
          </Typography>
          {dxSubtitle && (
            <Typography dxVariant="body2" dxNode="div" className="subtitle">
              {dxSubtitle}
            </Typography>
          )}
        </div>
      </div>
    );
  }
);
