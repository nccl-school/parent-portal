import { css } from "@linaria/core";
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
import type { CreateSuggestionResponse } from "@nccl/api/client";

import { getValidationErrors, isError } from "../../utils/client";
import type { action as createUserAction } from "../../api/api.suggestion.getManyOrCreateUnique";

export const SuggestionCreateDrawer = new ModalController({
  props: {
    dxVariant: "basic",
  },
  ModalContent,
});

const className = css`
  width: ${makeRem(600)};
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
  const errors = getValidationErrors<CreateSuggestionResponse>(fetcher.data);

  useEffect(() => {
    if (!fetcher.data) return;
    if (isError(fetcher.data)) return;
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
            rows={4}
          />
          <Callout
            variant="note"
            description="Please be respectful and follow our Community Guidelines. Keep your language constructive, inclusive, and kind. Suggestions that violate these principles may be removed."
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
