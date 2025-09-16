import { css } from "@linaria/core";
import {
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  FormGroup,
  Icon,
  InputGroup,
  InputRadio,
  InputText,
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
  Typography,
  useModalContext,
} from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { useCallback, useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { href, useFetcher } from "react-router";
import type { CreateFolderRequest } from "@nccl/api/client";
import type { action } from "app/api/api.resource.folder";

import type { ResourcesCreateFolderModalState } from "./resources-create-folder.utils";

import { placeholder } from "../../utils/isomorphic";
import { ResourceFolderTree } from "../resource-folder-tree/ResourceFolderTree";
import { getValidationErrors, isError, slugify } from "../../utils/client";

const locationOptions = {
  THIS_FOLDER: "this-folder",
  OTHER_LOCATION: "other-location",
} as const;

const styles = css`
  max-height: 90dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
`;

const treeStyles = css`
  padding: ${makeRem(24)};
  border-radius: ${makeRem(4)};
  background: ${makeColor("light-200")};
  margin-top: ${makeRem(24)};
  height: ${makeRem(200)};
  overflow: auto;
`;

const tagStyles = css`
  display: flex;
  align-items: center;
  gap: ${makeRem(8)};
`;

export function ResourcesCreateFolderContent() {
  const { state: modalState, close: closeModal } =
    useModalContext<ResourcesCreateFolderModalState>();
  const [location, setLocation] = useState<string>(locationOptions.THIS_FOLDER);
  const [state, setState] = useImmer<{
    name: string;
    slug: string;
    path: string;
    parentResourceId: string;
  }>({
    name: "",
    slug: "",
    path: modalState.currentPath,
    parentResourceId: modalState.initParentResourceId,
  });

  const fetcher = useFetcher<typeof action>();
  const handleSubmit = useCallback(async () => {
    const stateWithOwner: CreateFolderRequest = {
      ...state,
      owner: "school", // we don't want to create any ownership
    };
    await fetcher.submit(stateWithOwner, {
      method: "POST",
      action: href("/api/resource/folder"),
      encType: "application/json",
    });
  }, [state, fetcher]);

  useEffect(() => {
    if (!fetcher.data) return;
    if (isError(fetcher.data)) return;
    closeModal();
  }, [closeModal, fetcher.data]);

  const errors = getValidationErrors<CreateFolderRequest>(fetcher.data);

  return (
    <div className={styles}>
      <ModalHeader>
        <ModalHeaderTitle>Create a folder</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody style={{ overflowY: "auto" }}>
        <FormGroup
          dxTitle="1. Information"
          dxSubtitle="Provide some basic information about the folder"
        >
          <InputGroup>
            <InputText
              name="name"
              dxLabel="Folder name"
              dxError={errors.name?.[0]}
              onChange={({ currentTarget: { value } }) => {
                setState((draft) => {
                  draft.name = value;
                  draft.slug = slugify(value);
                });
              }}
            />
            <InputText
              name="slug"
              dxLabel="Folder slug"
              dxHint="This will be used in the URL. Use only lowercase letters, numbers, and dashes. No spaces or special characters"
              dxError={errors.slug?.[0]}
              value={state.slug}
              onChange={({ currentTarget: { value } }) =>
                setState((draft) => {
                  draft.slug = value;
                })
              }
            />
          </InputGroup>
        </FormGroup>
        <FormGroup dxTitle="2. Select a location">
          <InputGroup>
            <InputRadio
              dxVariant="default"
              name="location"
              checked={location === locationOptions.THIS_FOLDER}
              onChange={() => setLocation(locationOptions.THIS_FOLDER)}
            >
              <Typography dxNode="div" dxVariant="body3">
                This folder
              </Typography>
              <Typography dxNode="div" dxVariant="caption">
                {modalState.currentPath}
              </Typography>
            </InputRadio>
            <InputRadio
              dxVariant="default"
              name="location"
              checked={location === locationOptions.OTHER_LOCATION}
              onChange={() => setLocation(locationOptions.OTHER_LOCATION)}
            >
              <Typography dxNode="div" dxVariant="body3">
                Select a different folder
              </Typography>
            </InputRadio>
          </InputGroup>
          {location === locationOptions.OTHER_LOCATION && (
            <div className={treeStyles}>
              <ResourceFolderTree
                onSelect={(path, resource) => {
                  setState((draft) => {
                    draft.path = path;
                    draft.parentResourceId = resource.id;
                  });
                }}
              />
            </div>
          )}
        </FormGroup>
        <FormGroup
          dxTitle="3. Folder Summary"
          dxSubtitle="Review the information below to ensure it's correct."
        >
          <DescriptionList>
            <DescriptionListTag>
              <div className={tagStyles}>
                <Icon dxIcon="folder-02-stroke-standard" dxSize={16} />
                <span>Name</span>
              </div>
            </DescriptionListTag>
            <DescriptionListData>
              {state.name || placeholder}
            </DescriptionListData>
            <DescriptionListTag>
              <div className={tagStyles}>
                <Icon dxIcon="link-01-stroke-standard" dxSize={16} />
                <span>Slug</span>
              </div>
            </DescriptionListTag>
            <DescriptionListData>
              {state.slug || placeholder}
            </DescriptionListData>
            <DescriptionListTag>
              <div className={tagStyles}>
                <Icon dxIcon="pin-location-01-stroke-rounded" dxSize={16} />
                <span>Location</span>
              </div>
            </DescriptionListTag>
            <DescriptionListData>
              {state.path || placeholder}
            </DescriptionListData>
          </DescriptionList>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
        <ModalFooterSubmit
          dxColor="primary"
          type="button"
          isLoading={false}
          onClick={handleSubmit}
        >
          Submit
        </ModalFooterSubmit>
      </ModalFooter>
    </div>
  );
}
