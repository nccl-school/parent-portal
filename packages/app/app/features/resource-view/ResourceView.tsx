import {
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  useModalContext,
} from "@nccl/components";
import { useEffect } from "react";
import { href, useFetcher } from "react-router";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";

import type { ResourceViewState } from "./resource-view.utils";
import type { loader } from "./+server/view-file.server";
import { useResourceViewerControls } from "./resource-view.useResourceViewerControls";

import { MessageState } from "../../components/states/MessageState";
import { dates, renderLoaderData } from "../../utils/client";
import { LoadingState } from "../../components/states/LoadingState";

const styles = css`
  height: 100%;
  width: 100%;

  padding: ${makeRem(16)};
  background: ${makeColor("light-400")};
  iframe {
    height: 100%;
    width: 100%;
    border: none;
  }
`;

export function ResourceViewModalContent() {
  const { load, data } = useFetcher<typeof loader>();
  const {
    state: { resourceId },
  } = useModalContext<ResourceViewState>();
  const { closeViewer } = useResourceViewerControls();

  useEffect(() => {
    load(href("/resource-view/server/:id", { id: resourceId }));
  }, [load, resourceId]);

  return (
    <>
      <ModalHeader onClose={closeViewer}>
        <ModalHeaderTitle>
          {renderLoaderData(data, { loading: "Loading...", ok: (d) => d.name })}
        </ModalHeaderTitle>
        <ModalHeaderSubtitle>
          {renderLoaderData(data, {
            loading: "Loading...",
            ok: (d) => {
              const lastUpdated = `Last Updated: ${dates.format(d.updatedAt, "Relative")}`;
              if (d.description) return `${d.description} | ${lastUpdated}`;
              return lastUpdated;
            },
          })}
        </ModalHeaderSubtitle>
      </ModalHeader>
      <ModalBody>
        <div className={styles}>
          {renderLoaderData(data, {
            loading: <LoadingState>Loading...</LoadingState>,
            ok: (d) => {
              switch (d.mimeType) {
                case "application/pdf":
                case "application/vnd.google-apps.document":
                  return <iframe title="viewer" src={d.publicUrl} />;

                default:
                  return (
                    <MessageState>
                      {d.mimeType} is not currently supported
                    </MessageState>
                  );
              }
            },
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel onClose={closeViewer}>close</ModalFooterCancel>
      </ModalFooter>
    </>
  );
}
