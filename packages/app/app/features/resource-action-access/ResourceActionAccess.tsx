import { ModalController } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import { ResourceActionAccessContent } from "./ResourceActionAccessContent";
import type { ResourceActionAccessModalState } from "./resource-action-access.utils";

const styles = css`
  width: ${makeRem(600)};
  min-height: 60vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const ResourceActionAccess =
  new ModalController<ResourceActionAccessModalState>({
    props: {
      dxVariant: "modal",
      className: styles,
    },
    ModalContent: ResourceActionAccessContent,
  });
