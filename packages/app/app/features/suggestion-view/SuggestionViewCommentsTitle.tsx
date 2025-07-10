import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";

const styles = css`
  margin: ${makeRem(24)} 0;
`;

export function SuggestionViewCommentsTitle({
  numOfComments,
}: {
  numOfComments: number;
}) {
  return (
    <Typography dxVariant="heading5" dxNode="div" className={styles}>
      {`Comments (${numOfComments})`}
    </Typography>
  );
}
