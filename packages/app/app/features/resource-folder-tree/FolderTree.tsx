import { css } from "@linaria/core";
import type { ResourceTree } from "@nccl/api/client";
import { makeColor, makeRem, makeReset } from "@nccl/theme";

import { FolderTreeNode } from "./FolderTreeNode";

import {
  getResourceIcon,
  getResourceIconColor,
} from "../resources/resources.utils";

const styles = css`
  ${makeReset("ul")};

  li {
    margin: ${makeRem(2)} 0;
  }

  ul {
    margin-left: ${makeRem(24)};
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -${makeRem(4)};
      height: 100%;
      width: 1px;
      background: ${makeColor("tertiary-50", { opacity: 0.6 })};
    }
  }
`;

export function FolderTree({
  resourceTree,
  currentPath,
  onSelectFolder,
  basePath,
}: {
  resourceTree: ResourceTree;
  currentPath: string;
  onSelectFolder: (path: string) => void;
  basePath: string;
}) {
  const resourceEntries = Object.entries(resourceTree);
  if (resourceEntries.length === 0) return null;
  return (
    <ul className={styles}>
      {resourceEntries.map(([resourceId, resource]) => {
        if (resource.type !== "FOLDER") return null;
        const resourcePath = `${basePath}/${resource.slug}`;
        return (
          <li key={resourceId}>
            <FolderTreeNode
              isActive={currentPath === resourcePath}
              onClick={onSelectFolder}
              path={resourcePath}
              dxIcon={getResourceIcon(resource)}
              dxColor={getResourceIconColor(resource)}
            >
              {resource.name}
            </FolderTreeNode>
            {resource.children ? (
              <FolderTree
                currentPath={currentPath}
                onSelectFolder={onSelectFolder}
                resourceTree={resource.children}
                basePath={resourcePath}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
