import { Button } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionDelete } from "../resource-action-delete/ResourceActionDelete";

export function ResourceItemActionDelete(
  resource: GetResourceResponse["childResources"][0]
) {
  return (
    <Button
      dxVariant="icon"
      dxIcon="delete-02-stroke-standard"
      dxSize="md"
      dxStyle="outlined"
      dxColor="danger"
      onClick={(e) => ResourceActionDelete.launch(e, resource)}
    />
  );
}
