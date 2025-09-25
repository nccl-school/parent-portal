import { css } from "@linaria/core";
import { ModalController } from "@nccl/components";

import { ResourceViewModalContent } from "./ResourceView";
import type { ResourceViewState } from "./resource-view.utils";

export * from "./resource-view.useResourceViewerControls";

const styles = css`
  height: 100dvh;
  width: 100dvw;
  max-width: 100dvw;
  max-height: 100dvh;
  border-radius: 0 !important;

  &[open] {
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
`;

export const ResourceView = new ModalController<ResourceViewState>({
  ModalContent: ResourceViewModalContent,
  props: {
    dxVariant: "modal",
    className: styles,
  },
});
