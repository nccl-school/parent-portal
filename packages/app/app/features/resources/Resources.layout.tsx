import { css } from "@linaria/core";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import type { Route } from "./+types/Resources.layout";
import {
  ResourcesBreadcrumbDelimiter,
  ResourcesBreadcrumb,
} from "./ResourcesBreadcrumb";
import { ResourceFolderPane } from "./ResourceFolderPane";
import { ResourceMain } from "./ResourceMain";
import { ResourceMainSearch } from "./ResourceMainSearch";
import { ResourceMainRecentlyViewed } from "./ResourceMainRecentlyViewed";
import { ResourceMainBreadcrumbs } from "./ResourceMainBreadcrumbs";
import { ResourcePreview } from "./ResourcePreview";

import { getNCCLClient } from "../../utils/server";
import { renderData } from "../../utils/client";
import { ResourcesCreateFolder } from "../resources-create-folder";

const styles = css`
  ${makeResponsive({ from: "tablet" })} {
    display: grid;
    grid-template-columns: ${makeRem(300)} 1fr auto;
    grid-template-rows: 1fr;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const stylesMain = css`
  grid-area: main;
  background: ${makeColor("white")};
`;

export async function loader(args: Route.LoaderArgs) {
  const { "*": slugPath } = args.params;

  const ncclClient = getNCCLClient(args);
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
    <div className={styles}>
      <ResourceFolderPane />
      <ResourceMain>
        <ResourcesCreateFolder.Component />
        <ResourceMainSearch />
        <ResourceMainRecentlyViewed />
        <ResourceMainBreadcrumbs>
          {renderData(loaderData, {
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
      </ResourceMain>
      <ResourcePreview />
    </div>
  );
}
