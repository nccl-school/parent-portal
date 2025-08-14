import { Button, Tooltip, useTooltip } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionDelete } from "../resource-action-delete/ResourceActionDelete";

export function ResourceItemActionDelete(
  resource: GetResourceResponse["childResources"][0]
) {
  const tooltip = useTooltip({ position: "top" });
  return (
    <>
      <Button
        ref={tooltip.setTarget}
        dxVariant="icon"
        dxIcon="delete-02-stroke-standard"
        dxSize="md"
        dxStyle="outlined"
        dxColor="danger"
        onClick={(e) => ResourceActionDelete.launch(e, resource)}
      />
      <Tooltip ref={tooltip.setTooltip}>Delete</Tooltip>
    </>
  );
}
