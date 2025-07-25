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
} from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { useState } from "react";
import { useImmer } from "use-immer";

import { placeholder } from "../../utils/isomorphic";
import { ResourceFolderTree } from "../resource-folder-tree/ResourceFolderTree";
import { slugify } from "../../utils/client";

const locationOptions = {
  THIS_FOLDER: "this-folder",
  OTHER_LOCATION: "other-location",
} as const;

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
  const [location, setLocation] = useState<string>(locationOptions.THIS_FOLDER);
  const [state, setState] = useImmer<{
    name: string;
    slug: string;
    path: string;
    parentResourceId: string;
  }>({
    name: "",
    slug: "",
    path: "",
    parentResourceId: "",
  });

  return (
    <>
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
                folder path / folder path / this folder
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
        <ModalFooterSubmit dxColor="primary" type="submit" isLoading={false}>
          Submit
        </ModalFooterSubmit>
      </ModalFooter>
    </>
  );
}
