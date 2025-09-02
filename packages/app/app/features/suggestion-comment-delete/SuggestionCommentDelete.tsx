import {
  ModalBody,
  ModalController,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
  Typography,
  useModalContext,
} from "@nccl/components";
import { useEffect } from "react";
import { href, useFetcher } from "react-router";

import { isError } from "../../utils/client";

export const SuggestionCommentDelete = new ModalController<{
  commentId: string;
}>({
  props: { dxVariant: "modal" },
  ModalContent,
});

function ModalContent() {
  const { state, close: closeModal } = useModalContext<{ commentId: string }>();
  const { Form, data, ...fetcher } = useFetcher();

  useEffect(() => {
    if (!data || isError(data)) return;
    closeModal();
  }, [closeModal, data]);

  return (
    <Form
      method="DELETE"
      action={href("/api/suggestion/comment/:id", { id: state.commentId })}
    >
      <ModalHeader>
        <ModalHeaderTitle>Delete this comment?</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <Typography dxVariant="body1" dxNode="p">
          Are you sure that you want to delete this comment? This action cannot
          be undone.
        </Typography>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit
          isLoading={fetcher.state !== "idle"}
          dxColor="danger"
        >
          {fetcher.state !== "idle" ? "deleting..." : "delete"}
        </ModalFooterSubmit>
      </ModalFooter>
    </Form>
  );
}
