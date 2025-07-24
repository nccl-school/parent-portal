import { css } from "@linaria/core";
import { InputSearch, Typography } from "@nccl/components";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { href, Link, NavLink, Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import type { Route } from "./+types/Resources.layout";
import { ResourceFolderTree } from "./ResouceFolderList";

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
  padding: 0 ${makeRem(32)};
  padding-bottom: ${makeRem(32)};
  background: ${makeColor("white")};
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
              <ResourceFolderTree
                resourceTree={data.tree}
                baseRoute="/resources"
              />
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
            <Typography dxVariant="caption" dxNode="span">
              All Files
            </Typography>
          </Link>
          {renderData(loaderData, {
            loading: "Loading...",
            ok: (data) =>
              data.breadcrumbs.map((breadcrumb, i, origArr) => {
                const relPath = breadcrumb.pathSegments.join("/");

                const Content = (
                  <Typography dxVariant="caption" dxNode="span">
                    {breadcrumb.name}
                  </Typography>
                );
                return (
                  <Fragment key={breadcrumb.id}>
                    <Typography dxVariant="caption" dxNode="span">
                      /
                    </Typography>
                    {i === origArr.length - 1 ? (
                      Content
                    ) : (
                      <NavLink
                        key={breadcrumb.id}
                        to={href("/resources/*", { "*": relPath })}
                      >
                        {Content}
                      </NavLink>
                    )}
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
