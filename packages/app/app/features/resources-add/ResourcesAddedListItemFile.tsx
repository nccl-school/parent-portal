import { css } from "@linaria/core";
import type {
  CreateFileRequest,
  CreateResourceResponse,
  ErrorResponse,
} from "@nccl/api/client";
import { Callout, Icon, Progress, Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { classes, exhaustiveMatchGuard } from "@stratum-ui/core/utils";
import { memo, useEffect, useRef, useState } from "react";
import { match } from "ts-pattern";

import { useSession } from "../../hooks/hook.useSession";
import {
  getResourceIcon,
  getResourceIconColor,
} from "../resources/resources.utils";

export type ResourcesAddedListItemFile = {
  type: "FILE";
} & Required<CreateFileRequest>;

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
const progressStyles = css`
  grid-area: progress;
`;
const errStyles = css`
  grid-area: err;

  &.error {
    margin-top: ${makeRem(16)};
  }
`;

export const ResourcesAddedListItemFile = memo(
  function ResourcesAddedListItemFile(props: ResourcesAddedListItemFile) {
    const hasStartedRef = useRef(false);
    const [progress, setProgress] = useState<number>(0);
    const [res, setRes] = useState<
      | { status: "loading" }
      | { status: "ok"; data: CreateResourceResponse }
      | { status: "error"; error: ErrorResponse }
    >({ status: "loading" });
    const session = useSession();

    useEffect(() => {
      async function uploadWithProgress() {
        if (hasStartedRef.current) return;
        hasStartedRef.current = true;
        const token = session?.token;
        if (!token) throw new Error("Missing auth token");

        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const result = JSON.parse(xhr.responseText);
              setRes({ status: "ok", data: result });
            } catch (error) {
              console.log(error);
              setRes({
                status: "error",
                error: error as ErrorResponse,
              });
            }
          } else {
            const result = JSON.parse(xhr.responseText);
            setRes({
              status: "error",
              error: result as ErrorResponse,
            });
          }
        };

        xhr.onerror = (e) => {
          console.log(e);
          setRes({
            status: "error",
            error: {
              error_type: "bad_request",
              status: 400,
              message: "Error when attempting to upload.",
            } as ErrorResponse,
          });
        };

        xhr.open(
          "POST",
          `${import.meta.env.VITE_NCCL_API_URL}/api/resource/file`
        );
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        const formData = new FormData();

        switch (props.type) {
          case "FILE": {
            formData.append("file", props.file);
            formData.append("name", props.name);
            formData.append("slug", props.slug);
            formData.append("owner", props.owner);
            formData.append("parentResourceId", props.parentResourceId);
            break;
          }

          default:
            exhaustiveMatchGuard(props.type);
        }

        xhr.send(formData);
      }

      uploadWithProgress();
    }, [
      props.file,
      props.name,
      props.owner,
      props.parentResourceId,
      props.slug,
      props.type,
      session?.token,
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
              {match(res.status)
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
                .otherwise(() => null)}
            </div>
            <div className={actionsStyles}></div>
            <div className={progressStyles}>
              <Progress min={0} max={0} value={progress}>
                % Complete
              </Progress>
            </div>
            <div
              className={classes(errStyles, { error: res.status === "error" })}
            >
              {res.status === "error" && (
                <Callout
                  variant="danger"
                  description={res.error.message}
                  omitIcon
                />
              )}
            </div>
          </div>
        );

      default:
        return exhaustiveMatchGuard(props.type);
    }
  }
);
