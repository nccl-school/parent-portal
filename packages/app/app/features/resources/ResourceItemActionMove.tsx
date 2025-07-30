import { useUser } from "@clerk/react-router";
import { Button } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionMove } from "../resource-action-move/ResourceActionMove";

export function ResourceItemActionMove({
  resource,
  initialPath,
}: {
  resource: GetResourceResponse["childResources"][0];
  initialPath: string;
}) {
  const { user } = useUser();
  console.log(user);
  return (
    <Button
      dxVariant="icon"
      dxIcon="node-edit-stroke-standard"
      dxSize="md"
      dxStyle="outlined"
      onClick={(e) => ResourceActionMove.launch(e, { resource, initialPath })}
    />
  );
}
