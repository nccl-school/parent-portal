import { Button, Tooltip, useTooltip } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionMove } from "../resource-action-move/ResourceActionMove";

export function ResourceItemActionMove({
  resource,
  initialPath,
}: {
  resource: GetResourceResponse["childResources"][0];
  initialPath: string;
}) {
  const tooltip = useTooltip({ position: "top" });
  return (
    <>
      <Button
        ref={tooltip.setTarget}
        dxVariant="icon"
        dxIcon="node-edit-stroke-standard"
        dxSize="md"
        dxStyle="outlined"
        onClick={(e) => ResourceActionMove.launch(e, { resource, initialPath })}
      />
      <Tooltip ref={tooltip.setTooltip}>Move</Tooltip>
    </>
  );
}
