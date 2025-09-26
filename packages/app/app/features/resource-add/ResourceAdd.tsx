import { ModalController } from "@nccl/components";

import { ResourceAddContent } from "./ResourceAddContent";
import type { ResourceAddModalState } from "./resources-add.utils";

export const ResourceAdd = new ModalController<ResourceAddModalState>({
  props: {
    dxVariant: "modal",
  },
  ModalContent: ResourceAddContent,
});
