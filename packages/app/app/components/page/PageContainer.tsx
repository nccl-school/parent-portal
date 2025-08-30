import { css } from "@linaria/core";
import { makeResponsive } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { forwardRef, type JSX } from "react";

export type PageContainerPropsNative = JSX.IntrinsicElements["div"];
export type PageContainerPropsCustom = {
  dxVariant: "scrollable" | "static";
};
export type PageContainerProps = PageContainerPropsNative &
  PageContainerPropsCustom;

const styles = css`
  &.scrollable {
    ${makeResponsive({ from: "tablet" })} {
      height: 100%;
      overflow: auto;
    }
  }

  &.static {
    ${makeResponsive({ to: "tablet" })} {
      width: 100%;
    }

    ${makeResponsive({ from: "tablet" })} {
      height: 100%;
      overflow: hidden;
    }
  }
`;

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  function PageContainer(
    { children, className, dxVariant, ...restProps },
    ref
  ) {
    return (
      <div
        {...restProps}
        className={classes(styles, className, dxVariant)}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
