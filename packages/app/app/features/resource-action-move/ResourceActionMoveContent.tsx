import {
  Callout,
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  useModalContext,
} from "@nccl/components";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { useEffect, useState } from "react";
import { href, useFetcher } from "react-router";
import type {
  MoveResourceRequest,
  MoveResourceResponse,
} from "@nccl/api/client";

import type { ResourceActionMoveModalState } from "./resource-action-move.utils";

import { getValidationErrors, isError } from "../../utils/client";
import { placeholder } from "../../utils/isomorphic";
import { ResourceFolderTree } from "../resource-folder-tree/ResourceFolderTree";

const treeStyles = css`
  padding: ${makeRem(16)};
  height: ${makeRem(400)};
  overflow: auto;
  background: ${makeColor("light-200")};
  border-radius: ${makeRem(8)};
`;

const infoStyles = css`
  margin-bottom: ${makeRem(16)};
`;

export function ResourceActionMoveContent() {
  const {
    close: closeModal,
    state: { resource, initialPath },
  } = useModalContext<ResourceActionMoveModalState>();
  const [state, setState] = useState<{ path: string; id: string } | undefined>(
    undefined
  );

  const {
    Form,
    data,
    state: fetcherState,
  } = useFetcher<MoveResourceResponse>();

  useEffect(() => {
    if (!data || isError(data)) return;
    // TODO: Add toast
    closeModal();
  }, [closeModal, data]);

  const isLoading = fetcherState !== "idle";
  const validationErrors = getValidationErrors<keyof MoveResourceRequest>(data);

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Move resource</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          Move a resource into a different directory
        </ModalHeaderSubtitle>
      </ModalHeader>

      <ModalBody>
        {validationErrors.parentResourceId?.[0] && !state?.id && (
          <Callout
            className={infoStyles}
            description="Please select a new destination for the resource"
            variant="danger"
          />
        )}
        <DescriptionList className={infoStyles}>
          <DescriptionListTag>Original Path</DescriptionListTag>
          <DescriptionListData>{initialPath}</DescriptionListData>
          <DescriptionListTag>New Path</DescriptionListTag>
          <DescriptionListData>
            {state?.path ?? placeholder}
          </DescriptionListData>
        </DescriptionList>
        <div className={treeStyles}>
          <ResourceFolderTree
            initialPath={initialPath}
            onSelect={(path, node) => setState({ path, id: node.id })}
          />
        </div>
      </ModalBody>
      <Form
        method="PUT"
        action={href("/api/resource/:id/move", { id: resource.id })}
      >
        <input type="hidden" name="parentResourceId" value={state?.id} />
        <ModalFooter>
          <ModalFooterCancel />
          <ModalFooterSubmit isLoading={isLoading} type="submit">
            save & close
          </ModalFooterSubmit>
        </ModalFooter>
      </Form>
    </>
  );
}
