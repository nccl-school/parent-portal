import { useUser } from "@clerk/react-router";
import { Button } from "@nccl/components";
import type { GetResourceResponse } from "@nccl/api/client";

import { ResourceActionEdit } from "../resource-action-edit/ResourceActionEdit";

export function ResourceItemActionEdit(
  resource: GetResourceResponse["childResources"][0]
) {
  const { user } = useUser();
  console.log(user);
  return (
    <Button
      dxVariant="icon"
      dxIcon="pencil-edit-01-stroke-standard"
      dxSize="md"
      dxStyle="outlined"
      dxColor="primary"
      onClick={(e) => ResourceActionEdit.launch(e, resource)}
    />
  );
}
