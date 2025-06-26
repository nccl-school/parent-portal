import { css } from "@linaria/core";
import { Button, Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import type { MouseEventHandler } from "react";

const styles = css`
  margin: 0 auto;
  width: auto;
  text-align: center;
  margin-top: ${makeRem(80)};
  button {
    margin: 0 auto;
    margin-top: ${makeRem(16)};
  }
`;

export function SuggestionAdd({
  handleAddSuggestion,
}: {
  handleAddSuggestion: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className={styles}>
      <Typography dxNode="div" dxVariant="caption">
        Can't find your idea? Feel free to create a new one!
      </Typography>
      <Button
        dxVariant="contained"
        dxSize="md"
        dxColor="secondary"
        onClick={handleAddSuggestion}
      >
        Create a new suggestion
      </Button>
    </div>
  );
}
