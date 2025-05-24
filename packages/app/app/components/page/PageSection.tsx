import { css } from "@linaria/core";
import { makeCustom, makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type PageSectionPropsNative = JSX.IntrinsicElements["section"];
export type PageSectionPropsCustom = {
  dxTitle?: string;
  dxSubtitle?: string;
};
export type PageSectionProps = PageSectionPropsNative & PageSectionPropsCustom;

const styles = css`
  padding: 0 ${makeCustom("page--gutter-mobile")};

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-desktop")};
  }
`;

export const PageSection = forwardRef<HTMLElement, PageSectionProps>(
  function PageSection({ children, className, ...restProps }, ref) {
    return (
      <section {...restProps} className={classes(className, styles)} ref={ref}>
        {children}
      </section>
    );
  }
);
