import type { GetResourceResponse } from "@nccl/api/client";
import { useImperativeHandle, useState, type RefObject } from "react";

import { ResourceItemActionAccess } from "./ResourceItemActionAccess";
import { ResourceItemActionDelete } from "./ResourceItemActionDelete";
import { ResourceItemActionEdit } from "./ResourceItemActionEdit";
import { ResourceItemActionMove } from "./ResourceItemActionMove";
import { ResourceItemActionCopyLink } from "./ResourceItemActionCopyLink";

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

  if (!isOpen) return null;

  return (
    <>
      <ResourceItemActionEdit {...resource} />
      <ResourceItemActionMove resource={resource} initialPath={initialPath} />
      <ResourceItemActionAccess {...resource} />
      <ResourceItemActionCopyLink {...resource} />
      {resource.type !== "FOLDER" && <ResourceItemActionDelete {...resource} />}
    </>
  );
}
