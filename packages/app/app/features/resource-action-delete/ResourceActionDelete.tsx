import { ModalController } from "@nccl/components";

import { ResourceActionDeleteContent } from "./ResourceActionDeleteContent";
import type { ResourceActionDeleteModalState } from "./resources-delete.utils";

export const ResourceActionDelete =
  new ModalController<ResourceActionDeleteModalState>({
    props: {
      dxVariant: "basic",
    },
    ModalContent: ResourceActionDeleteContent,
  });
