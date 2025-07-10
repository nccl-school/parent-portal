import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import type { JSX } from "react";
import { forwardRef } from "react";

export type DescriptionListPropsNative = JSX.IntrinsicElements["dl"];
export type DescriptionListProps = DescriptionListPropsNative;

const styles = css`
  display: grid;
  grid-template-columns: min-content auto;
  column-gap: ${makeRem(16)};
  row-gap: ${makeRem(20)};

  margin: 0;
  padding: 0;
`;

export const DescriptionList = forwardRef<
  HTMLDListElement,
  DescriptionListProps
>(function DescriptionList({ children, className, ...restProps }, ref) {
  return (
    <dl {...restProps} className={classes(styles, className)} ref={ref}>
      {children}
    </dl>
  );
});
