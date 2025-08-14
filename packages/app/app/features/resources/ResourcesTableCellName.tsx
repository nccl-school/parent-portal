import type { GetResourceResponse } from "@nccl/api/client";
import { Icon, Typography } from "@nccl/components";
import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import { Link } from "react-router";
import { match } from "ts-pattern";

import { getResourceIcon, getResourceIconColor } from "./resources.utils";

const styles = css`
  display: flex;
  gap: ${makeRem(8)};
  align-items: center;
`;

export function ResourcesTableCellName(
  resource: GetResourceResponse["childResources"][0]
) {
  return (
    <div className={styles}>
      <Icon
        dxIcon={getResourceIcon(resource)}
        dxSize={20}
        dxColor={getResourceIconColor(resource)}
      />
      {match(resource)
        .with({ type: "FOLDER" }, (s) => (
          <Link to={`./${s.slug}`}>
            <Typography dxVariant="body3" dxNode="div">
              {s.name}
            </Typography>
          </Link>
        ))
        .otherwise((s) => (
          <Typography dxVariant="body3" dxNode="div">
            {s.name}
          </Typography>
        ))}
    </div>
  );
}
