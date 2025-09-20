import { ModalController } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import { ResourcesCreateFolderContent } from "./ResourcesCreateFolderContent";
import type { ResourcesCreateFolderModalState } from "./resources-create-folder.utils";

const styles = css`
  max-width: ${makeRem(600)};
`;

export const ResourcesCreateFolder =
  new ModalController<ResourcesCreateFolderModalState>({
    props: {
      dxVariant: "modal",
      className: styles,
    },
    ModalContent: ResourcesCreateFolderContent,
  });
