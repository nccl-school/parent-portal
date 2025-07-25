import { css } from "@linaria/core";
import type { ResourceTree } from "@nccl/api/client";
import { makeColor, makeRem, makeReset } from "@nccl/theme";

import { getResourceIcon, getResourceIconColor } from "./resources.utils";
import { ResourceFolderTreeItem } from "./ResourceFolderTreeItem";

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

export function ResourceFolderTree({
  resourceTree,
  baseRoute,
}: {
  resourceTree: ResourceTree;
  baseRoute: string;
}) {
  const resourceEntries = Object.entries(resourceTree);
  if (resourceEntries.length === 0) return null;
  return (
    <ul className={styles}>
      {resourceEntries.map(([resourceId, resource]) => {
        if (resource.type !== "FOLDER") return null;
        const resourceSlug = `${baseRoute}/${resource.slug}`;
        return (
          <li key={resourceId}>
            <ResourceFolderTreeItem
              to={resourceSlug}
              dxIcon={getResourceIcon(resource)}
              dxColor={getResourceIconColor(resource)}
            >
              {resource.name}
            </ResourceFolderTreeItem>
            {resource.children ? (
              <ResourceFolderTree
                resourceTree={resource.children}
                baseRoute={resourceSlug}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
