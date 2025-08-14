import {
  ModalBody,
  ModalFooter,
  ModalFooterCancel,
  ModalHeader,
  ModalHeaderSubtitle,
  ModalHeaderTitle,
  Tab,
  Tabs,
  useModalContext,
} from "@nccl/components";
import { useState, type JSX } from "react";
import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";

import type { ResourceActionAccessModalState } from "./resource-action-access.utils";
import { ResourceActionAccessContentSchool } from "./ResourceActionAccessContentSchool";
import { ResourceActionAccessContentUsers } from "./ResourceActionAccessContentUsers";
import { ResourceActionAccessContentOrgs } from "./ResourceActionAccessContentOrgs";

const tabs: { value: string; display: string; Component: () => JSX.Element }[] =
  [
    {
      value: "school",
      display: "Entire School",
      Component: ResourceActionAccessContentSchool,
    },
    {
      value: "users",
      display: "Specific Users",
      Component: ResourceActionAccessContentUsers,
    },
    {
      value: "orgs",
      display: "Specific Orgs",
      Component: ResourceActionAccessContentOrgs,
    },
  ];

const buttonStyles = css`
  ${makeReset("button")};
`;

const contentStyles = css`
  margin-top: ${makeRem(16)};
`;

export function ResourceActionAccessContent() {
  const { state: resource } = useModalContext<ResourceActionAccessModalState>();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const Content = activeTab.Component;
  return (
    <>
      <ModalHeader>
        <ModalHeaderTitle>Manage Access</ModalHeaderTitle>
        <ModalHeaderSubtitle>Resource: {resource.name}</ModalHeaderSubtitle>
      </ModalHeader>
      <ModalBody>
        <Tabs>
          {tabs.map((tab) => {
            const isActive = activeTab.value === tab.value;
            return (
              <li key={tab.value}>
                <button
                  className={classes(buttonStyles, { active: isActive })}
                  onClick={() => setActiveTab(tab)}
                >
                  <Tab dxActive={isActive}>{tab.display}</Tab>
                </button>
              </li>
            );
          })}
        </Tabs>
        <div className={contentStyles}>
          <Content />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalFooterCancel />
      </ModalFooter>
    </>
  );
}
