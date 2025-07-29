import {
  Icon,
  ModalBody,
  ModalFooter,
  ModalFooterSubmit,
  ModalHeader,
  ModalHeaderTitle,
  Tab,
  Tabs,
  useModalContext,
  type IconNames,
} from "@nccl/components";
import type { ResourceType } from "@nccl/api/client";
import { useState, type JSX } from "react";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";
import { useRevalidator } from "react-router";

import { ResourcesAddContentFile } from "./ResourcesAddContentFile";
import { ResourcesAddContentGoogleDoc } from "./ResourcesAddContentGoogleDoc";

const stylesTab = css`
  width: 100%;
  display: flex;
  margin-bottom: ${makeRem(32)};
`;

const stylesBtn = css`
  ${makeReset("button")}

  & > div {
    display: grid;
    padding-left: ${makeRem(8)};
    grid-template-columns: ${makeRem(24)} auto;
    align-items: center;
    gap: ${makeRem(8)};
  }
`;

const stylesBody = css`
  padding-bottom: 0;
`;

const stylesDiv = css`
  overflow: auto;
`;

const tabs: {
  type: ResourceType;
  display: string;
  icon: IconNames;
  Component: () => JSX.Element;
}[] = [
  {
    type: "FILE",
    display: "File",
    icon: "upload-01-stroke-standard",
    Component: ResourcesAddContentFile,
  },
  {
    type: "EXTERNAL_DOC",
    display: "Google Doc",
    icon: "google-solid-standard",
    Component: ResourcesAddContentGoogleDoc,
  },
];

export function ResourcesAddContent() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const TabContent = activeTab.Component;
  const { close: closeModal } = useModalContext();
  const revalidator = useRevalidator();
  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Add a resource</ModalHeaderTitle>
      </ModalHeader>
      <ModalBody className={stylesBody}>
        <Tabs className={stylesTab}>
          {tabs.map((tab) => {
            const isActive = tab.type === activeTab.type;
            return (
              <li key={tab.type}>
                <button
                  className={classes(stylesBtn, { active: isActive })}
                  onClick={() => setActiveTab(tab)}
                >
                  <Tab dxActive={isActive}>
                    <Icon dxIcon={tab.icon} />
                    <span>{tab.display}</span>
                  </Tab>
                </button>
              </li>
            );
          })}
        </Tabs>
      </ModalBody>
      <ModalBody className={stylesDiv}>
        <TabContent />
      </ModalBody>
      <ModalFooter>
        <ModalFooterSubmit
          type="button"
          isLoading={false}
          onClick={() => {
            revalidator.revalidate();
            closeModal();
          }}
        >
          Done
        </ModalFooterSubmit>
      </ModalFooter>
    </>
  );
}
