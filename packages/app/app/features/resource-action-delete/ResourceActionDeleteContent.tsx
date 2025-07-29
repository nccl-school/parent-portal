import {
  Button,
  Callout,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalHeader,
  ModalHeaderTitle,
  Typography,
  useModalContext,
} from "@nccl/components";
import { href, useFetcher } from "react-router";
import { useEffect } from "react";
import { match } from "ts-pattern";

import type { ResourceActionDeleteModalState } from "./resources-delete.utils";

export function ResourceActionDeleteContent() {
  const { close: closeModal, state: resource } =
    useModalContext<ResourceActionDeleteModalState>();

  const { data, Form, state } = useFetcher();

  const isLoading = state !== "idle";

  useEffect(() => {
    if (!data) return;
    // TODO: Add toast
    closeModal();
  }, [closeModal, data]);

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Delete resource</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <Typography dxVariant="body1" dxNode="div">
          <div>
            Are you sure you want to delete <b>{resource.name}</b>? This action
            will also delete the following:
          </div>
          <ul>
            <li>All ownership tied to the resource</li>
            <li>All permissions associated with the resource</li>
            <li>The actual file in storage</li>
          </ul>
        </Typography>
        <Callout
          variant="info"
          description="This action is permanent and cannot be undone."
        />
      </ModalBody>
      <Form
        method="DELETE"
        action={match(resource)
          .with({ type: "FILE" }, () =>
            href("/api/resource/:id", { id: resource.id })
          )
          .otherwise(() => "NOT IMPLEMENTED")}
      >
        <ModalFooter>
          <ModalFooterCancel />
          <Button
            dxVariant="contained"
            dxColor="danger"
            dxSize="md"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </ModalFooter>
      </Form>
    </>
  );
}
