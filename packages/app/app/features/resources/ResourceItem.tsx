import type { GetResourceResponse } from "@nccl/api/client";
import { TableBodyCol, TableRow } from "@nccl/components";
import { useRef } from "react";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";

import {
  ResourceItemActions,
  type ResourceActionControllerRef,
} from "./ResourceItemActions";
import { ResourcesTableCellName } from "./ResourcesTableCellName";

import { dates } from "../../utils/client";
import { placeholder } from "../../utils/isomorphic";

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

export function ResourceItem({
  initialPath,
  resource,
}: {
  initialPath: string;
  resource: GetResourceResponse["childResources"][0];
}) {
  const controlRef = useRef<ResourceActionControllerRef | null>(null);

  return (
    <TableRow
      key={resource.id}
      onMouseEnter={() => {
        controlRef.current?.handleOpen();
      }}
      onMouseLeave={() => {
        controlRef.current?.handleClose();
      }}
    >
      <TableBodyCol>
        <ResourcesTableCellName {...resource} />
      </TableBodyCol>
      <TableBodyCol>
        {dates.format(resource.updatedAt, "Relative")}
      </TableBodyCol>
      <TableBodyCol>{placeholder}</TableBodyCol>
      <TableBodyCol>{placeholder}</TableBodyCol>
      <TableBodyCol className={styles}>
        <ResourceItemActions
          controlRef={controlRef}
          initialPath={initialPath}
          resource={resource}
        />
      </TableBodyCol>
    </TableRow>
  );
}
