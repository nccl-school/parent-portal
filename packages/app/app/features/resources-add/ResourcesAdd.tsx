import { ModalController } from "@nccl/components";

import { ResourcesAddContent } from "./ResourcesAddContent";
import type { ResourcesAddModalState } from "./resources-add.utils";

export const ResourcesAdd = new ModalController<ResourcesAddModalState>({
  props: {
    dxVariant: "modal",
  },
  ModalContent: ResourcesAddContent,
});
