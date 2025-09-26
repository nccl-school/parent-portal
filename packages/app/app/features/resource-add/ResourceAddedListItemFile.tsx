import { css } from "@linaria/core";
import type { CreateFileRequest } from "@nccl/api/client";
import { Callout, Icon, Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import { memo, useEffect } from "react";
import { match } from "ts-pattern";
import { href, useFetcher } from "react-router";

import type { action } from "./+server/upload-file.server-route";

import {
  getResourceIcon,
  getResourceIconColor,
} from "../resources/resources.utils";
import { renderActionData } from "../../utils/client";

export type ResourceAddedListItemFile = {
  type: "FILE";
} & Required<CreateFileRequest>;

const styles = css`
  display: grid;
  grid-template-columns: ${makeRem(48)} 1fr auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "icon title status actions"
    "icon subtitle status actions"
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
  background: ${makeColor("danger-50", { opacity: 0.3 })};
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
`;
const errStyles = css`
  grid-area: err;

  &:has(.error) {
    margin-top: ${makeRem(16)};
  }
`;

export const ResourceAddedListItemFile = memo(
  function ResourceAddedListItemFile(props: ResourceAddedListItemFile) {
    const { submit, data } = useFetcher<typeof action>();

    useEffect(() => {
      switch (props.type) {
        case "FILE": {
          const formData = new FormData();
          formData.append("file", props.file);
          formData.append("name", props.name);
          formData.append("slug", props.slug);
          formData.append("owner", props.owner);
          formData.append("parentResourceId", props.parentResourceId);
          submit(formData, {
            action: href("/resource-add/file"),
            method: "POST",
            encType: "multipart/form-data",
          });
          break;
        }

        default:
          exhaustiveMatchGuard(props.type);
      }
    }, [
      props.file,
      props.name,
      props.owner,
      props.parentResourceId,
      props.slug,
      props.type,
      submit,
    ]);

    switch (props.type) {
      case "FILE":
        return (
          <div className={styles}>
            <div className={iconStyles}>
              <Icon
                dxIcon={getResourceIcon({
                  type: "FILE",
                  mimeType: props.file.type,
                })}
                dxSize={24}
                dxColor={getResourceIconColor({
                  type: "FILE",
                  mimeType: props.file.type,
                })}
              />
            </div>
            <Typography
              dxNode="div"
              dxVariant="heading5"
              className={titleStyles}
            >
              {props.file.name}
            </Typography>
            <Typography
              dxNode="div"
              dxVariant="body3"
              className={subtitleStyles}
            >
              <Icon
                dxIcon="link-01-stroke-standard"
                dxSize={16}
                dxColor="neutral-dark"
              />
              <span>{props.slug}</span>
            </Typography>
            <div className={statusStyles}>
              {renderActionData(data, {
                loading: (
                  <Typography dxVariant="caption" dxNode="div">
                    Loading...
                  </Typography>
                ),
                ok: (d) => {
                  return match(d.status)
                    .with("error", () => {
                      return (
                        <Icon
                          dxIcon="alert-02-solid-standard"
                          dxColor="danger"
                          dxSize={24}
                        />
                      );
                    })
                    .with("ok", () => (
                      <Icon
                        dxIcon="checkmark-circle-02-solid-standard"
                        dxColor="success"
                        dxSize={24}
                      />
                    ))
                    .otherwise(() => null);
                },
              })}
            </div>
            <div className={actionsStyles}></div>
            <div className={errStyles}>
              {renderActionData(data, {
                loading: null,
                ok: (d) => {
                  if (d.status === "ok") return null;
                  return (
                    <Callout
                      className="error"
                      variant="danger"
                      description={d.error.message}
                      omitIcon
                    />
                  );
                },
              })}
            </div>
          </div>
        );

      default:
        return exhaustiveMatchGuard(props.type);
    }
  }
);
