import type { GetResourceResponse } from "@nccl/api/client";

export type ResourceActionDeleteModalState =
  GetResourceResponse["childResources"][0];
