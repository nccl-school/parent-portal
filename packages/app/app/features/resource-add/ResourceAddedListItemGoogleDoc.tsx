import { css } from "@linaria/core";
import { Icon, Label, Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { memo } from "react";

import {
  getResourceIcon,
  getResourceIconColor,
} from "../resources/resources.utils";

export type ResourceAddedListItemGoogleDocProps = {
  name: string;
  id: string;
  slug: string;
};

const styles = css`
  display: grid;
  grid-template-columns: ${makeRem(48)} 1fr auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "icon title status actions"
    "icon subtitle status actions"
    "progress progress progress progress"
    "err err err err";
  column-gap: ${makeRem(8)};
  border: 1px solid ${makeColor("light-500")};
  border-radius: ${makeRem(8)};
  padding: ${makeRem(16)};
`;

const iconStyles = css`
  grid-area: icon;
  display: grid;
  place-content: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
  background: ${makeColor("primary-50", { opacity: 0.3 })};
  border-radius: 50%;
`;

const titleStyles = css`
  grid-area: title;
  margin-bottom: ${makeRem(4)};
`;
const subtitleStyles = css`
  grid-area: subtitle;
  display: flex;
  gap: ${makeRem(4)};
  align-items: center;
`;
const statusStyles = css`
  grid-area: status;
`;
const actionsStyles = css`
  grid-area: actions;
  display: flex;
  gap: ${makeRem(8)};
`;

const errStyles = css`
  grid-area: err;

  &.error {
    margin-top: ${makeRem(16)};
  }
`;

export const ResourceAddedListItemGoogleDoc = memo(
  function ResourceAddedListItemGoogleDoc(
    props: ResourceAddedListItemGoogleDocProps
  ) {
    return (
      <div className={styles}>
        <div className={iconStyles}>
          <Icon
            dxIcon={getResourceIcon({
              type: "EXTERNAL_DOC",
              mimeType: "",
            })}
            dxSize={24}
            dxColor={getResourceIconColor({
              type: "EXTERNAL_DOC",
              mimeType: "",
            })}
          />
        </div>
        <Typography dxNode="div" dxVariant="heading5" className={titleStyles}>
          {props.name}
        </Typography>
        <Typography dxNode="div" dxVariant="body3" className={subtitleStyles}>
          <Icon
            dxIcon="link-01-stroke-standard"
            dxSize={16}
            dxColor="neutral-dark"
          />
          <span>{props.slug}</span>
        </Typography>
        <div className={statusStyles}>
          <Label dxVariant="success">Uploaded</Label>
        </div>
        <div className={actionsStyles}></div>
        <div className={classes(errStyles)}></div>
      </div>
    );
  }
);
