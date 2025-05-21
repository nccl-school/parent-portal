import type { Meta } from "@storybook/react";
import type { RefCallback } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Navbar } from "./Navbar.js";
import { NavbarItem } from "./NavbarItem.js";
import { NavbarItemIcon } from "./NavbarItemIcon.js";
import { NavbarItemText } from "./NavbarItemText.js";

const meta: Meta = {
  title: "Navbar",
  component: Navbar,
} satisfies Meta<typeof meta>;

export default meta;

export const Basic = () => {
  const [activeTab, setActiveTab] = useState<
    "home" | "resources" | "directory" | "calendar" | "settings"
  >("home");

  const onNavbarMount = useCallback<RefCallback<HTMLElement>>((node) => {
    if (!node) return;
    const anchors = node.getElementsByTagName("a");

    function handleClick(e: Event) {
      setActiveTab(
        (e.currentTarget as HTMLAnchorElement).id as typeof activeTab
      );
    }
    for (const anchor of anchors) {
      anchor.addEventListener("click", handleClick);
    }

    return () => {
      for (const anchor of anchors) {
        anchor.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <Navbar ref={onNavbarMount}>
      <NavbarItem id="home" dxIsActive={activeTab === "home"}>
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </NavbarItem>
      <NavbarItem id="resources" dxIsActive={activeTab === "resources"}>
        <NavbarItemIcon
          dxBaseIcon="folder-02-stroke-standard"
          dxActiveIcon="folder-02-solid-standard"
        />
        <NavbarItemText>Resources</NavbarItemText>
      </NavbarItem>
      <NavbarItem id="directory" dxIsActive={activeTab === "directory"}>
        <NavbarItemIcon
          dxBaseIcon="contact-01-stroke-standard"
          dxActiveIcon="contact-01-solid-standard"
        />
        <NavbarItemText>Directory</NavbarItemText>
      </NavbarItem>
      <NavbarItem id="calendar" dxIsActive={activeTab === "calendar"}>
        <NavbarItemIcon
          dxBaseIcon="calendar-03-stroke-standard"
          dxActiveIcon="calendar-03-solid-standard"
        />
        <NavbarItemText>Calendar</NavbarItemText>
      </NavbarItem>
      <NavbarItem id="settings" dxIsActive={activeTab === "settings"}>
        <NavbarItemIcon
          dxBaseIcon="settings-02-stroke-standard"
          dxActiveIcon="settings-02-solid-standard"
        />
        <NavbarItemText>Settings</NavbarItemText>
      </NavbarItem>
    </Navbar>
  );
};
