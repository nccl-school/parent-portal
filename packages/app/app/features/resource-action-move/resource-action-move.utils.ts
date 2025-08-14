import type { GetResourceResponse } from "@nccl/api/client";

export type ResourceActionMoveModalState = {
  resource: GetResourceResponse["childResources"][0];
  initialPath: string;
};
