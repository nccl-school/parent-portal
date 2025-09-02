import { ModalController } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionEditContent } from "./ResourceActionEditContent";

const styles = css`
  width: ${makeRem(500)};
`;

export const ResourceActionEdit = new ModalController<
  GetResourceResponse["childResources"][0]
>({
  props: {
    dxVariant: "modal",
    className: styles,
  },
  ModalContent: ResourceActionEditContent,
});
