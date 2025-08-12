import type { GetResourceResponse } from "@nccl/api/client";
import { TableBodyCol } from "@nccl/components";
import { useImperativeHandle, useState, type RefObject } from "react";
import { makeRem } from "@nccl/theme";
import { css } from "@linaria/core";

import { ResourceItemActionAccess } from "./ResourceItemActionAccess";
import { ResourceItemActionDelete } from "./ResourceItemActionDelete";
import { ResourceItemActionEdit } from "./ResourceItemActionEdit";
import { ResourceItemActionMove } from "./ResourceItemActionMove";

export type ResourceActionControllerRef = {
  handleOpen: () => void;
  handleClose: () => void;
};

const styles = css`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  & > div {
    display: flex;
    gap: ${makeRem(8)};
    height: 100%;
    align-items: center;
  }
`;

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
    <TableBodyCol className={styles}>
      <ResourceItemActionEdit {...resource} />
      <ResourceItemActionMove resource={resource} initialPath={initialPath} />
      <ResourceItemActionAccess {...resource} />
      {/* <Button
        dxVariant="icon"
        dxIcon="link-01-stroke-standard"
        dxSize="md"
        dxStyle="outlined"
      /> */}
      <ResourceItemActionDelete {...resource} />
    </TableBodyCol>
  );
}
