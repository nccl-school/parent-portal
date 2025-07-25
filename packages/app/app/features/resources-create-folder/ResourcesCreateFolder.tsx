import { css } from "@linaria/core";
import {
  FormGroup,
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

import { ResourceFolderTree } from "../resource-folder-tree/ResourceFolderTree";

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

export function ResourcesCreateFolderContent() {
  const [location, setLocation] = useState<string>(locationOptions.THIS_FOLDER);

  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Create a folder</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <InputText name="name" dxLabel="Folder name" />
        </FormGroup>
        <FormGroup dxTitle="Select a location">
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
              <ResourceFolderTree />
            </div>
          )}
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
