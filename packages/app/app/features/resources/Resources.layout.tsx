import { css } from "@linaria/core";
import { InputSearch, Typography } from "@nccl/components";
import { makeColor, makeRem, makeResponsive } from "@nccl/theme";
import { Outlet } from "react-router";

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
    const tree = await ncclClient.resource.getTreeByPath(slugPath);
    return tree;
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
              <ResourceFolderTree resourceTree={data} baseRoute="/resources" />
            ),
          })}
        </nav>
      </div>
      <form className={stylesSearch}>
        <InputSearch dxSize="lg" dxVariant="contrasted" placeholder="Search" />
      </form>
      <div className={stylesBreadcrumb}>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <Typography dxVariant="caption" dxNode="span">
            All Files
          </Typography>
          <Typography dxVariant="caption" dxNode="span">
            Folder 1
          </Typography>
          <Typography dxVariant="caption" dxNode="span">
            Folder 2
          </Typography>
        </div>
      </div>
      <div className={stylesMain}>
        <Outlet />
      </div>
      <div className={stylesPreview}></div>
    </div>
  );
}
