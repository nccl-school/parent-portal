import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { forwardRef, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";

export const CUSTOM_PROPERTY_TOP_POINT = "--top-point";

export type SuggestionViewCommentsTitlePropsNative =
  JSX.IntrinsicElements["div"];
export type SuggestionViewCommentsTitlePropsCustom = {
  numOfComments: number;
};
export type SuggestionViewCommentsTitleProps =
  SuggestionViewCommentsTitlePropsNative &
    SuggestionViewCommentsTitlePropsCustom;
const styles = css`
  padding: ${makeRem(24)} 0;
  position: sticky;
  top: ${`var(${CUSTOM_PROPERTY_TOP_POINT})`};
  background: ${makeColor("white")};
  z-index: 10;
`;
export const SuggestionViewCommentsTitle = forwardRef<
  HTMLDivElement,
  SuggestionViewCommentsTitleProps
>(function SuggestionViewCommentsTitle(
  { className, numOfComments, ...restProps },
  ref
) {
  return (
    <Typography
      ref={ref}
      dxVariant="heading5"
      dxNode="div"
      className={classes(styles, className)}
      {...restProps}
    >
      {`Comments (${numOfComments})`}
    </Typography>
  );
});
