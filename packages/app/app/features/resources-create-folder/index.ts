import { ModalController } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import { ResourcesCreateFolderContent } from "./ResourcesCreateFolder";
import type { ResourcesCreateFolderModalState } from "./resources-create-folder.utils";

const styles = css`
  width: ${makeRem(600)};
  max-height: calc(100vh - 100px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
`;

export const ResourcesCreateFolder =
  new ModalController<ResourcesCreateFolderModalState>({
    props: {
      dxVariant: "modal",
      className: styles,
    },
    ModalContent: ResourcesCreateFolderContent,
  });
