import { Button, Tooltip, useTooltip } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionEdit } from "../resource-action-edit/ResourceActionEdit";

export function ResourceItemActionEdit(
  resource: GetResourceResponse["childResources"][0]
) {
  const tooltip = useTooltip({ position: "top" });
  return (
    <>
      <Button
        ref={tooltip.setTarget}
        dxVariant="icon"
        dxIcon="pencil-edit-01-stroke-standard"
        dxSize="md"
        dxStyle="outlined"
        dxColor="primary"
        onClick={(e) => ResourceActionEdit.launch(e, resource)}
      />
      <Tooltip ref={tooltip.setTooltip}>Edit</Tooltip>
    </>
  );
}
