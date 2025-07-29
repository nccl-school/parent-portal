import { ModalController } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem, makeResponsive } from "@nccl/theme";

import { ResourcesAddContent } from "./ResourcesAddContent";
import type { ResourcesAddModalState } from "./resources-add.utils";

const styles = css`
  display: grid;
  grid-template-rows: auto auto 1fr auto;

  ${makeResponsive({ from: "laptop" })} {
    width: ${makeRem(800)};
    height: 80vh;
    overflow: hidden;
  }
`;

export const ResourcesAdd = new ModalController<ResourcesAddModalState>({
  props: {
    dxVariant: "basic",
    className: styles,
  },
  ModalContent: ResourcesAddContent,
});
