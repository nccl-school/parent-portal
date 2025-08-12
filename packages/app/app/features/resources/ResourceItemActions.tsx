import type { GetResourceResponse } from "@nccl/api/client";
import { Button } from "@nccl/components";
import { useImperativeHandle, useState, type RefObject } from "react";

import { ResourceItemActionAccess } from "./ResourceItemActionAccess";
import { ResourceItemActionDelete } from "./ResourceItemActionDelete";
import { ResourceItemActionEdit } from "./ResourceItemActionEdit";
import { ResourceItemActionMove } from "./ResourceItemActionMove";

export type ResourceActionControllerRef = {
  handleOpen: () => void;
  handleClose: () => void;
};

export function ResourceItemActions({
  controlRef,
  resource,
  initialPath,
}: {
  controlRef: RefObject<ResourceActionControllerRef | null>;
  initialPath: string;
  resource: GetResourceResponse["childResources"][0];
}) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle<ResourceActionControllerRef, ResourceActionControllerRef>(
    controlRef,
    () => ({
      handleOpen: () => setIsOpen(true),
      handleClose: () => setIsOpen(false),
    })
  );

  if (!isOpen || resource.type === "FOLDER") return null;

  return (
    <>
      <ResourceItemActionEdit {...resource} />
      <ResourceItemActionMove resource={resource} initialPath={initialPath} />
      <ResourceItemActionAccess {...resource} />
      <Button
        dxVariant="icon"
        dxIcon="link-01-stroke-standard"
        dxSize="md"
        dxStyle="outlined"
      />
      <ResourceItemActionDelete {...resource} />
    </>
  );
}
