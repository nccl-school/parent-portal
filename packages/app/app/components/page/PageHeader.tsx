import { forwardRef, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";
import { Typography } from "@nccl/components";
import { css } from "@linaria/core";
import { makeCustom, makeRem, makeResponsive } from "@nccl/theme";

export type PageHeaderPropsNative = JSX.IntrinsicElements["div"];
export type PageHeaderPropsCustom = {
  dxTitle: string;
  dxSubtitle?: string;
};
export type PageHeaderProps = PageHeaderPropsNative & PageHeaderPropsCustom;

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    padding: ${makeCustom("page--gutter-mobile")};

    h2 {
      font-size: ${makeRem(24)} !important;
    }
  }
  ${makeResponsive({ from: "laptop" })} {
    padding: ${makeCustom("page--gutter-desktop")};
    padding-bottom: ${makeRem(48)};
    max-width: ${makeCustom("container--max-width")};
    margin: 0 auto;
    text-align: left;
    width: 100%;
  }

  & > .subtitle {
    margin-top: ${makeRem(8)};
  }
`;

export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader(
    { children, className, dxTitle, dxSubtitle, ...restProps },
    ref
  ) {
    return (
      <div {...restProps} className={classes(className, styles)} ref={ref}>
        <div>
          <Typography dxVariant="heading1" dxNode="h2">
            {dxTitle}
          </Typography>
          {dxSubtitle && (
            <Typography dxVariant="body1" dxNode="div" className="subtitle">
              {dxSubtitle}
            </Typography>
          )}
        </div>
      </div>
    );
  }
);
