import { css } from "@linaria/core";
import { InputSearch, Typography } from "@nccl/components";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { Link, Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import type { Route } from "./+types/Resources.layout";
import { ResourceFolderTree } from "./ResourceFolderList";
import {
  ResourcesBreadcrumbDelimiter,
  ResourcesBreadcrumb,
  BreadcrumbText,
} from "./ResourcesBreadcrumb";
import { ResourceFolderListItem } from "./ResourceFolderListItem";

import { getNCCLClient } from "../../utils/server";
import { renderData } from "../../utils/client";

const styles = css`
  ${makeResponsive({ from: "tablet" })} {
    display: grid;
    grid-template-columns: ${makeRem(300)} 1fr auto;
    grid-template-areas:
      "explorer search preview"
      "explorer breadcrumb preview"
      "explorer main preview";
    grid-template-rows: auto auto 1fr;
    height: 100%;
    width: 100%;
  }
`;

const stylesExplorer = css`
  grid-area: explorer;
  padding: 0 ${makeRem(24)};
  overflow: auto;
  border-right: 1px solid ${makeColor("neutral-light-100")};

  header {
    padding: ${makeRem(32)} 0;
  }

  nav {
    padding-bottom: ${makeRem(32)} 0;
  }
`;
const stylesSearch = css`
  grid-area: search;
  padding: ${makeRem(32)};
  background: ${makeColor("white")};
`;
const stylesBreadcrumb = css`
  grid-area: breadcrumb;
  display: flex;
  align-items: center;
  padding: 0 ${makeRem(32)};
  padding-bottom: ${makeRem(4)};
  background: ${makeColor("white")};

  a {
    color: ${makeColor("neutral-light-900")} !important;
    text-decoration: none;

    &:hover {
      color: ${makeColor("neutral-dark-900")} !important;
      text-decoration: underline;
    }
    &:visited {
      color: unset;
    }
  }
`;
const stylesPreview = css`
  grid-area: preview;
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
      <div className={stylesExplorer}>
        <header>
          <Typography dxNode="div" dxVariant="heading4">
            Folders
          </Typography>
        </header>
        <nav>
          {renderData(loaderData, {
            loading: "Loading folders...",
            ok: (data) => (
              <>
                <ResourceFolderListItem
                  to="/resources"
                  end
                  dxIcon="files-01-stroke-standard"
                  dxColor="primary"
                >
                  All files
                </ResourceFolderListItem>
                <ResourceFolderTree
                  resourceTree={data.tree}
                  baseRoute="/resources"
                />
              </>
            ),
          })}
        </nav>
      </div>
      <form className={stylesSearch}>
        <InputSearch dxSize="lg" dxVariant="contrasted" placeholder="Search" />
      </form>
      <div className={stylesBreadcrumb}>
        <nav style={{ display: "flex", gap: ".5rem" }}>
          <Link to="/resources">
            <BreadcrumbText>All Files</BreadcrumbText>
          </Link>
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
        </nav>
      </div>
      <div className={stylesMain}>
        <Outlet />
      </div>
      <div className={stylesPreview}></div>
    </div>
  );
}
