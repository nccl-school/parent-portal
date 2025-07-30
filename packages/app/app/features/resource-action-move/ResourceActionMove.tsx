import { ModalController } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import { ResourceActionMoveContent } from "./ResourceActionMoveContent";
import type { ResourceActionMoveModalState } from "./resource-action-move.utils";

const styles = css`
  width: ${makeRem(500)};
`;

export const ResourceActionMove =
  new ModalController<ResourceActionMoveModalState>({
    props: {
      dxVariant: "basic",
      className: styles,
    },
    ModalContent: ResourceActionMoveContent,
  });
