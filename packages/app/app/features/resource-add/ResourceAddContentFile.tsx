import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { useCallback, useState } from "react";
import { FormGroup, useModalContext } from "@nccl/components";
import { useImmer } from "use-immer";
import { match } from "ts-pattern";

import type { ResourceAddModalState } from "./resources-add.utils";
import { ResourceAddedList } from "./ResourceAddedList";
import { ResourceAddedListItemFile } from "./ResourceAddedListItemFile";

import { LoadingState } from "../../components/states/LoadingState";
import { EmptyState } from "../../components/states/EmptyState";
import { slugify } from "../../utils/client";

const styles = css`
  width: 100%;
  padding: ${makeRem(32)};
  display: grid;
  place-content: center;
  background: ${makeColor("light-100")};
  border: 1px dashed ${makeColor("light-600")};
  border-radius: ${makeRem(8)};
  transition: all 0.15s ease-in-out;

  img {
    transition: all 0.15s ease-in-out;
  }

  &.dragging {
    border: 1px dashed ${makeColor("primary-900")};
    background: ${makeColor("primary-50")};

    img {
      scale: 1.2;
    }
  }

  & > div {
    max-width: 50ch;
    padding: 0;
    background: 0;
  }
`;

export function ResourceAddContentFile() {
  const {
    state: { initParentResourceId },
  } = useModalContext<ResourceAddModalState>();
  const [files, setFiles] = useImmer<ResourceAddedListItemFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const droppedFiles = event.dataTransfer.files;
      for (const droppedFile of droppedFiles) {
        const autoName = droppedFile.name;
        const autoSlug = slugify(droppedFile.name);
        setFiles((draft) => {
          draft.push({
            type: "FILE",
            file: droppedFile,
            name: autoName,
            slug: autoSlug,
            parentResourceId: initParentResourceId,
            owner: "school",
          });
        });
      }
    },
    [initParentResourceId, setFiles]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <>
      <FormGroup dxTitle="1. Upload files">
        <div
          className={classes(styles, { dragging: isDragging })}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <EmptyState
            imgSrc="/images/image-icon-upload.png"
            imgSize={100}
            imgAlt="upload"
            title="Drag and drop your files here"
            borderless
          >
            The files will be uploaded immediately and you'll be able update
            attributes afterwards
          </EmptyState>
        </div>
      </FormGroup>
      <FormGroup dxTitle="2. Manage created resources">
        <ResourceAddedList>
          {match(files)
            .with([], () => <LoadingState>Nothing added yet</LoadingState>)
            .otherwise((d) =>
              d.map((file, i) => (
                <li key={`${file.file.name}_${i}`}>
                  <ResourceAddedListItemFile {...file} />
                </li>
              ))
            )}
        </ResourceAddedList>
      </FormGroup>
    </>
  );
}
