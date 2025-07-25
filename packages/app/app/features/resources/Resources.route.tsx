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

import type { Route } from "./+types/Resources.route";
import { ResourcesTitle } from "./ResourcesTitle";
import { ResourcesTableCellName } from "./ResourcesTableCellName";

import { EmptyState } from "../../components/states/EmptyState";
import { placeholder } from "../../utils/isomorphic";
import { LoadingState } from "../../components/states/LoadingState";
import { dates, renderData } from "../../utils/client";
import { getNCCLClient } from "../../utils/server";
import { ResourcesCreateFolder } from "../resources-create-folder";

export async function loader(args: Route.LoaderArgs) {
  const { "*": slugPath } = args.params;

  const ncclClient = getNCCLClient(args);
  try {
    const tree = await ncclClient.resource.getResourceByPath(slugPath);
    return tree;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

const stylesTable = css`
  ${makeResponsive({ from: "tablet" })} {
    padding: ${makeRem(32)};
    max-width: 100%;
  }
`;

const stylesEmpty = css`
  ${makeResponsive({ from: "tablet" })} {
    padding: ${makeRem(32)};

    & > * {
      max-width: 100%;
    }
  }
`;

export default function ResourcesRoute({ loaderData }: Route.ComponentProps) {
  const title = renderData(loaderData, {
    loading: "Loading...",
    ok: (d) => (d.id === "__ROOT__" ? "All Files" : d.name),
  }) as string;

  return (
    <>
      <ResourcesTitle title={title}>
        <Button
          dxVariant="outlined"
          dxColor="secondary"
          dxSize="md"
          dxStartIcon="upload-01-stroke-standard"
        >
          Upload
        </Button>
        <Button
          dxVariant="outlined"
          dxSize="md"
          dxStartIcon="resources-add-stroke-standard"
        >
          Add
        </Button>
        <Button
          dxVariant="outlined"
          dxSize="md"
          dxStartIcon="folder-add-stroke-standard"
          onClick={ResourcesCreateFolder.launch}
        >
          Create folder
        </Button>
        <Button
          dxVariant="outlined"
          dxSize="md"
          dxColor="tertiary"
          dxStartIcon="share-08-stroke-standard"
        >
          Share
        </Button>
      </ResourcesTitle>

      {renderData(loaderData, {
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
                imgSize={200}
                imgAlt="all-the-things"
                title="There's nothing in here"
                borderless
              >
                <div style={{ width: "40ch", margin: "0 auto" }}>
                  Doesn't look like there's anything in this folder. So take a
                  second and enjoy this tranquil moment.
                </div>
              </EmptyState>
            </div>
          ) : (
            <Table className={stylesTable}>
              <TableHead>
                <TableRow>
                  <TableHeadCol>Name</TableHeadCol>
                  <TableHeadCol>Last Modified</TableHeadCol>
                  <TableHeadCol>Size</TableHeadCol>
                  <TableHeadCol dxJustify="right"></TableHeadCol>
                </TableRow>
              </TableHead>
              <TableBody>
                {resource.childResources.map((childResource) => (
                  <TableRow key={childResource.id}>
                    <TableBodyCol>
                      <ResourcesTableCellName {...childResource} />
                    </TableBodyCol>
                    <TableBodyCol>
                      {dates.format(childResource.updatedAt, "Relative")}
                    </TableBodyCol>
                    <TableBodyCol>{placeholder}</TableBodyCol>
                    <TableBodyCol>
                      <div
                        style={{
                          display: "flex",
                          gap: makeRem(8),
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          dxVariant="icon"
                          dxIcon="share-08-stroke-standard"
                          dxSize="md"
                          dxStyle="outlined"
                        />
                        <Button
                          dxVariant="icon"
                          dxIcon="delete-02-stroke-standard"
                          dxSize="md"
                          dxStyle="outlined"
                        />
                        <Button
                          dxVariant="icon"
                          dxIcon="link-01-stroke-standard"
                          dxSize="md"
                          dxStyle="outlined"
                        />
                      </div>
                    </TableBodyCol>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ),
      })}
    </>
  );
}
