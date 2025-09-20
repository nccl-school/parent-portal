import { css } from "@linaria/core";
import { Typography } from "@nccl/components";
import { makeRem, makeColor, makeResponsive } from "@nccl/theme";
import { href, useLocation, useNavigate } from "react-router";
import { useCallback } from "react";

import { FolderTreeNode } from "../resource-folder-tree/FolderTreeNode";
import { ResourceFolderTree } from "../resource-folder-tree/ResourceFolderTree";
import { normalizeFolderPath } from "../resource-folder-tree/resource-folder-tree.utils";

const styles = css`
  ${makeResponsive({ to: "laptop" })} {
    display: none;
  }

  ${makeResponsive({ from: "laptop" })} {
    padding: 0 ${makeRem(24)};
    overflow: auto;
    border-right: 1px solid ${makeColor("neutral-light-100")};

    header {
      padding: ${makeRem(32)} 0;
    }

    nav {
      padding-bottom: ${makeRem(32)} 0;
    }
  }
`;

export function ResourceFolderPane() {
  const goToRoute = useNavigate();
  const { pathname } = useLocation();

  const handleSelectFolder = useCallback<(path: string) => void>(
    (path) => {
      const routePath = normalizeFolderPath(path);
      goToRoute(href("/resources/*", { "*": routePath }));
    },
    [goToRoute]
  );

  return (
    <article className={styles}>
      <header>
        <Typography dxNode="div" dxVariant="heading4">
          Folders
        </Typography>
      </header>
      <nav>
        <FolderTreeNode
          onClick={() => handleSelectFolder("")}
          isActive={pathname === "/resources"}
          dxIcon="files-01-stroke-standard"
          dxColor="primary"
        >
          All files
        </FolderTreeNode>
        <ResourceFolderTree
          initialPath={removeLeadingWord(pathname, "/resources")}
          onSelect={handleSelectFolder}
        />
      </nav>
    </article>
  );
}

function removeLeadingWord(input: string, word: string): string {
  const pattern = new RegExp(`^${word}/?`);
  return input.replace(pattern, "");
}
