import type { GetResourceResponse } from "@nccl/api/client";
import { Button, TableBodyCol, TableRow } from "@nccl/components";
import { useRef } from "react";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import {
  ResourceItemActions,
  type ResourceActionControllerRef,
} from "./ResourceItemActions";
import { ResourcesTableCellName } from "./ResourcesTableCellName";

import { dates } from "../../utils/client";
import { CLASSES, placeholder } from "../../utils/isomorphic";

const rowStyles = css`
  &:hover {
    td {
      background: ${makeColor("light-200")};
    }
  }
`;

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
      className={rowStyles}
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
      <TableBodyCol className={CLASSES.desktopOnly}>
        {dates.format(resource.updatedAt, "Relative")}
      </TableBodyCol>
      <TableBodyCol className={CLASSES.desktopOnly}>{placeholder}</TableBodyCol>
      <TableBodyCol className={CLASSES.desktopOnly}>{placeholder}</TableBodyCol>
      <TableBodyCol className={classes(styles, CLASSES.desktopOnly)}>
        <ResourceItemActions
          controlRef={controlRef}
          initialPath={initialPath}
          resource={resource}
        />
      </TableBodyCol>
      <TableBodyCol className={CLASSES.mobileOnly}>
        <Button
          dxVariant="icon"
          dxIcon="more-horizontal-circle-01-solid-standard"
          dxSize="md"
          dxColor="primary-1000"
        />
      </TableBodyCol>
    </TableRow>
  );
}
