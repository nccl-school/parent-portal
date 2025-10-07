import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import type { Route } from "./+types/Resources.layout";
import {
  ResourcesBreadcrumbDelimiter,
  ResourcesBreadcrumb,
} from "./ResourceMainBreadcrumbItem";
import { ResourceFolderPane } from "./ResourceFolderPane";
import { ResourceMain } from "./ResourceMain";
import { ResourceMainSearch } from "./ResourceMainSearch";
import { ResourceMainBreadcrumbs } from "./ResourceMainBreadcrumb";

import { renderLoaderData } from "../../utils/client";
import { ResourcesCreateFolder } from "../resources-create-folder/ResourcesCreateFolder";
import { ResourceAdd } from "../resource-add/ResourceAdd";

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    height: 100%;
    overflow: hidden;
  }
  ${makeResponsive({ from: "laptop" })} {
    display: grid;
    grid-template-columns: ${makeRem(300)} 1fr auto;
    grid-template-rows: 1fr;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const stylesMain = css`
  background: ${makeColor("white")};
`;

const stylesContainer = css`
  height: 100%;
  background: ${makeColor("white")};
  overflow-y: auto;
`;

export async function loader(args: Route.LoaderArgs) {
  const { "*": slugPath } = args.params;

  const ncclClient = args.context.resolve("ncclClient");
  try {
    const [tree, breadcrumbs] = await Promise.all([
      ncclClient.resource.getTreeByPath(slugPath),
      ncclClient.resource.getPathBreadcrumb(slugPath),
    ]);

    return { tree, breadcrumbs };
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

export default function ResourcesLayout({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <ResourceAdd.Component />
      <ResourcesCreateFolder.Component />

      <div className={styles}>
        <ResourceFolderPane />
        <ResourceMain>
          <ResourceMainSearch />
          <div className={stylesContainer}>
            <ResourceMainBreadcrumbs>
              {renderLoaderData(loaderData, {
                loading: "Loading...",
                ok: (data) =>
                  data.breadcrumbs.map((breadcrumb, i, origArr) => {
                    const isLast = i === origArr.length - 1;
                    const relPath = breadcrumb.pathSegments.join("/");

                    if (breadcrumb.id === "__ROOT__") return null;

                    return (
                      <Fragment key={breadcrumb.id}>
                        <ResourcesBreadcrumbDelimiter />
                        <ResourcesBreadcrumb
                          breadcrumb={breadcrumb}
                          isLast={isLast}
                          relPath={relPath}
                        />
                      </Fragment>
                    );
                  }),
              })}
            </ResourceMainBreadcrumbs>
            <div className={stylesMain}>
              <Outlet />
            </div>
          </div>
        </ResourceMain>
      </div>
    </>
  );
}
