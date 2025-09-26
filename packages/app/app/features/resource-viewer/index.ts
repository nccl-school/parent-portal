import { css } from "@linaria/core";
import { ModalController } from "@nccl/components";

import { ResourceViewerModalContent } from "./ResourceViewer";
import type { ResourceViewerState } from "./resource-viewer.utils";

export * from "./resource-viewer.useResourceViewerControls";

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

export const ResourceView = new ModalController<ResourceViewerState>({
  ModalContent: ResourceViewerModalContent,
  props: {
    dxVariant: "modal",
    className: styles,
  },
});
