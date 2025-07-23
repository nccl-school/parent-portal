import { css } from "@linaria/core";
import type { ResourceTree } from "@nccl/api/client";
import { Icon, Typography } from "@nccl/components";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { Link, useLocation } from "react-router";
import { classes } from "@stratum-ui/core/utils";

import { getResourceIcon } from "./resources.utils";

const styles = css`
  ${makeReset("ul")};

  a {
    ${makeReset("anchor")};
    &:visited {
      color: unset;
      text-decoration: unset;
    }
    padding: 0 ${makeRem(12)};
    background: transparent;
    border-radius: ${makeRem(8)};

    &:hover,
    &.active {
      background: ${makeColor("tertiary-50", { opacity: 0.4 })};
    }
  }
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

const itemStyles = css`
  display: grid;
  grid-template-columns: ${makeRem(20)} 1fr;
  align-items: center;
  width: 100%;
  gap: ${makeRem(12)};
  height: ${makeRem(36)};
`;

export function ResourceFolderTree({
  resourceTree,
  baseRoute,
}: {
  resourceTree: ResourceTree;
  baseRoute: string;
}) {
  const { pathname } = useLocation();
  const resourceEntries = Object.entries(resourceTree);
  if (resourceEntries.length === 0) return null;
  return (
    <ul className={styles}>
      {resourceEntries.map(([resourceId, resource]) => {
        if (resource.type !== "FOLDER") return null;
        const resourceSlug = `${baseRoute}/${resource.slug}`;
        return (
          <li key={resourceId}>
            <Link
              className={classes(itemStyles, {
                active: pathname === resourceSlug,
              })}
              to={resourceSlug}
            >
              <div>
                <Icon
                  dxIcon={getResourceIcon(resource)}
                  dxSize={20}
                  dxColor="tertiary-500"
                />
              </div>
              <Typography dxNode="div" dxVariant="body3">
                {resource.name}
              </Typography>
            </Link>
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
