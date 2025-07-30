import { Button } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionAccess } from "../resource-action-access/ResourceActionAccess";

export function ResourceItemActionAccess(
  resource: GetResourceResponse["childResources"][0]
) {
  return (
    <Button
      dxVariant="icon"
      dxIcon="user-lock-01-stroke-standard"
      dxSize="md"
      dxStyle="outlined"
      onClick={(e) => ResourceActionAccess.launch(e, resource)}
    />
  );
}
