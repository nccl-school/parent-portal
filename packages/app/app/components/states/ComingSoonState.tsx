import type { ReactNode } from "react";
import { css } from "@linaria/core";
import { Button, Typography } from "@nccl/components";

import { EmptyState } from "./EmptyState";

import { SuggestionCreateDrawer } from "../../features/suggestion-create";

const styles = css`
  p {
    margin: 1rem 0;
  }
  button {
    margin: 0 auto;
  }
`;

export function ComingSoonState({
  children,
  allowSuggestions = false,
}: {
  allowSuggestions?: boolean;
  children: ReactNode;
}) {
  return (
    <EmptyState
      title="Coming soon!"
      imgAlt="sunrise"
      imgSrc="/images/image-icon-sunrise.png"
      imgSize={160}
      borderless
      className={styles}
    >
      {children}
      {allowSuggestions && (
        <>
          <SuggestionCreateDrawer.Component />
          <Typography dxNode="p" dxVariant="body1">
            For now, if you have any suggestions on what you'd like to see,
            please add a suggestion!
          </Typography>
          <Button
            dxSize="md"
            dxVariant="contained"
            dxColor="secondary"
            onClick={SuggestionCreateDrawer.launch}
          >
            Add a suggestion
          </Button>
        </>
      )}
    </EmptyState>
  );
}
