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
  useModalContext,
} from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { useFetcher } from "react-router";

export const SuggestionCreateDrawer = new ModalController({
  props: {
    dxVariant: "drawer-rtl",
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

  const fetcher = useFetcher();
  return (
    <fetcher.Form className={className}>
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
            dxHint={`e.g. "I'd love receive calendar reminders for upcoming school events."`}
          />
          <InputTextarea
            dxLabel="Description"
            dxHint="Explain your suggestion in more detail"
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
        >
          submit
        </Button>
      </ModalFooter>
    </fetcher.Form>
  );
}
