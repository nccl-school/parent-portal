import type { GetResourceResponse } from "@nccl/api/client";

export type ResourceActionAccessModalState =
  GetResourceResponse["childResources"][0];
