import { css } from "@linaria/core";
import type { CreateSuggestionRequest } from "@nccl/api/client";
import {
  Button,
  InputGroup,
  InputText,
  InputTextarea,
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  Typography,
  Callout,
  useModalContext,
} from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { useEffect } from "react";
import { href, useFetcher } from "react-router";

import { getValidationErrors } from "../../utils/client";
import type { action as createUserAction } from "../../api/api.suggestion.createSuggestion";

export const SuggestionCreateDrawer = new ModalController({
  props: {
    dxVariant: "basic",
  },
  ModalContent,
});

const className = css`
  width: ${makeRem(500)};
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const styles = css`
  height: 100%;
  overflow: auto;
`;

function ModalContent() {
  const { close: closeModal } = useModalContext();

  const fetcher = useFetcher<typeof createUserAction>();
  const errors = getValidationErrors<keyof CreateSuggestionRequest>(
    fetcher.data
  );

  useEffect(() => {
    if (!fetcher.data) return;
    closeModal();
    console.log(fetcher.data);
  }, [closeModal, fetcher.data]);

  return (
    <fetcher.Form
      action={href("/api/suggestion")}
      method="POST"
      className={className}
    >
      <ModalHeader>
        <ModalHeaderTitle>Create a suggestion</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          How can we make this application better?
        </ModalHeaderSubtitle>
      </ModalHeader>
      <ModalBody className={styles}>
        <Typography dxVariant="body1" dxNode="p">
          Whether it's a feature you've been wishing for, a small tweak that
          would make life easier, or something you've seen in another app that
          you'd love to see here — we want to hear it.
        </Typography>
        <InputGroup
          dxLayout="stacked"
          style={{
            marginTop: makeRem(16),
          }}
        >
          <InputText
            dxLabel="Summary"
            name="title"
            dxError={errors.title?.[0]}
            dxHint={`e.g. "I'd love receive calendar reminders for upcoming school events."`}
          />
          <InputTextarea
            dxLabel="Description"
            name="description"
            dxError={errors?.description?.[0]}
            dxHint="Explain your suggestion in more detail"
          />
          <Callout
            variant="note"
            description="After you submit a suggestion, we’ll take a quick look and then add it to the board so others can see and vote on it"
          />
        </InputGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          dxVariant="outlined"
          dxColor="secondary"
          dxSize="md"
          type="button"
          onClick={closeModal}
        >
          close
        </Button>
        <Button
          dxVariant="contained"
          dxColor="secondary"
          dxSize="md"
          type="submit"
          disabled={fetcher.state !== "idle"}
        >
          {fetcher.state !== "idle" ? "loading..." : "submit"}
        </Button>
      </ModalFooter>
    </fetcher.Form>
  );
}
