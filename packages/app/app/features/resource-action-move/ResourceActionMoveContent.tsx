import {
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
import { useState } from "react";

import type { ResourceActionMoveModalState } from "./resource-action-move.utils";

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
    state: { initialPath },
  } = useModalContext<ResourceActionMoveModalState>();
  const [state, setState] = useState<{ path: string; id: string } | undefined>(
    undefined
  );

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Move resource</ModalHeaderTitle>
        <ModalHeaderSubtitle>
          Move a resource into a different directory
        </ModalHeaderSubtitle>
      </ModalHeader>

      <ModalBody>
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
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit isLoading={false} type="submit">
          Save and close
        </ModalFooterSubmit>
      </ModalFooter>
    </>
  );
}
