import { css } from "@linaria/core";
import { Button, Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";

import { SuggestionCreateDrawer } from "../suggestion-create";

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

export function SuggestionAdd() {
  return (
    <div className={styles}>
      <SuggestionCreateDrawer.Component />
      <Typography dxNode="div" dxVariant="body3">
        Can't find your idea? Feel free to create a new one!
      </Typography>
      <Button
        dxVariant="contained"
        dxSize="md"
        dxColor="secondary"
        onClick={SuggestionCreateDrawer.launch}
      >
        Create a new suggestion
      </Button>
    </div>
  );
}
