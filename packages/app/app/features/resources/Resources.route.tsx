import {
  Button,
  Table,
  TableBody,
  TableBodyCol,
  TableHead,
  TableHeadCol,
  TableRow,
} from "@nccl/components";
import { makeRem, makeResponsive } from "@nccl/theme";
import { css } from "@linaria/core";
import { useEffect, type MouseEvent } from "react";

import type { Route } from "./+types/Resources.route";
import { ResourcesTitle } from "./ResourcesTitle";
import { ResourceItem } from "./ResourceItem";

import { CLASSES, createRouteHandle } from "../../utils/isomorphic";
import { EmptyState } from "../../components/states/EmptyState";
import { LoadingState } from "../../components/states/LoadingState";
import { parseLoaderData, renderLoaderData } from "../../utils/client";
import { getNCCLClient } from "../../utils/server";
import { ResourcesCreateFolder } from "../resources-create-folder/ResourcesCreateFolder";
import { ResourcesAdd } from "../resources-add/ResourcesAdd";
import { ResourceActionDelete } from "../resource-action-delete/ResourceActionDelete";
import { ResourceActionEdit } from "../resource-action-edit/ResourceActionEdit";
import { ResourceActionMove } from "../resource-action-move/ResourceActionMove";
import { ResourceActionAccess } from "../resource-action-access/ResourceActionAccess";
import { ResourceView, useResourceViewerControls } from "../resource-view";

export async function loader(args: Route.LoaderArgs) {
  const { "*": slugPath } = args.params;

  const ncclClient = getNCCLClient(args);
  try {
    const resource = await ncclClient.resource.getResourceByPath(slugPath);
    return resource;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

const stylesTable = css`
  ${makeResponsive({ from: "laptop" })} {
    padding: ${makeRem(32)};
    max-width: 100%;
  }
`;

const stylesEmpty = css`
  ${makeResponsive({ from: "laptop" })} {
    padding: ${makeRem(32)};

    & > * {
      max-width: 100%;
    }
  }
`;

export const handle = createRouteHandle({
  mobileTitle: "Resources",
});

export default function ResourcesRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { resourcePreviewId } = useResourceViewerControls();

  const title = renderLoaderData(loaderData, {
    loading: "Loading...",
    ok: (d) => (d.id === "__ROOT__" ? "All Files" : d.name),
  }) as string;

  function launchAdd(e: MouseEvent<HTMLButtonElement>) {
    const resource = parseLoaderData(loaderData);
    if (!resource) return; // TODO: Throw a toast

    ResourcesAdd.launch(e, {
      currentPath: params["*"],
      initParentResourceId: resource.id,
    });
  }

  function launchCreateFolder(e: MouseEvent<HTMLButtonElement>) {
    const resource = parseLoaderData(loaderData);
    if (!resource) return; // TODO: Throw a toast

    ResourcesCreateFolder.launch(e, {
      currentPath: params["*"],
      initParentResourceId: resource.id,
    });
  }

  // launch the viewer
  useEffect(() => {
    if (!resourcePreviewId) return;
    ResourceView.launch(undefined, { resourceId: resourcePreviewId });
  }, [resourcePreviewId]);

  return (
    <>
      <ResourcesTitle title={title}>
        <Button
          className={CLASSES.desktopOnly}
          dxVariant="outlined"
          dxSize="md"
          dxStartIcon="resources-add-stroke-standard"
          onClick={launchAdd}
        >
          Add
        </Button>
        <Button
          className={CLASSES.desktopOnly}
          dxVariant="outlined"
          dxSize="md"
          dxStartIcon="folder-add-stroke-standard"
          onClick={launchCreateFolder}
        >
          Create folder
        </Button>
        {/* <Button
          dxVariant="outlined"
          dxSize="md"
          dxColor="tertiary"
          dxStartIcon="share-08-stroke-standard"
        >
          Share
        </Button> */}
      </ResourcesTitle>

      {/* Actions */}
      <ResourceActionDelete.Component />
      <ResourceActionEdit.Component />
      <ResourceActionMove.Component />
      <ResourceActionAccess.Component />
      <ResourceView.Component />

      {renderLoaderData(loaderData, {
        loading: (
          <TableRow>
            <TableBodyCol colSpan={4}>
              <LoadingState>Loading...</LoadingState>
            </TableBodyCol>
          </TableRow>
        ),
        ok: (resource) =>
          resource.childResources.length === 0 ? (
            <div className={stylesEmpty}>
              <EmptyState
                imgSrc="/images/image-icon-island.png"
                imgSize={100}
                imgAlt="all-the-things"
                title="There's nothing in here"
                borderless
              >
                <div
                  style={{
                    maxWidth: "40ch",
                    margin: "0 auto",
                  }}
                >
                  Enjoy this tranquil moment.
                </div>
              </EmptyState>
            </div>
          ) : (
            <Table className={stylesTable}>
              <TableHead>
                <TableRow>
                  <TableHeadCol>Name</TableHeadCol>
                  <TableHeadCol className={CLASSES.desktopOnly}>
                    Last Modified
                  </TableHeadCol>
                  <TableHeadCol className={CLASSES.desktopOnly}>
                    Size
                  </TableHeadCol>
                  <TableHeadCol className={CLASSES.desktopOnly}>
                    Who can access
                  </TableHeadCol>
                  <TableHeadCol className={CLASSES.mobileOnly}></TableHeadCol>
                </TableRow>
              </TableHead>
              <TableBody>
                {resource.childResources.map((childResource) => {
                  return (
                    <ResourceItem
                      key={childResource.id}
                      resource={childResource}
                      initialPath={params["*"]}
                    />
                  );
                })}
              </TableBody>
            </Table>
          ),
      })}
    </>
  );
}
