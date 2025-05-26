import type { Meta } from "@storybook/react";
import { css } from "@linaria/core";
import { makeResponsive } from "@nccl/theme";

import { NavbarSecondary } from "./NavbarSecondary.js";
import { NavbarSecondaryGroup } from "./NavbarSecondaryGroup.js";
import { NavbarSecondaryItem } from "./NavbarSecondaryItem.js";
import { NavbarSecondaryItemIcon } from "./NavbarSecondaryItemIcon.js";
import { NavbarSecondaryItemText } from "./NavbarSecondaryItemText.js";

import { Basic as NavbarStory } from "../navbar/Navbar.stories.js";
import { Basic as HeaderStory } from "../header/Header.stories.js";

const meta: Meta = {
  title: "Navbar Secondary",
  component: NavbarSecondary,
} satisfies Meta<typeof meta>;

export default meta;

const styles = css`
  display: grid;
  height: 100vh;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    "header"
    "navbar-secondary"
    "main"
    "navbar";

  ${makeResponsive({ from: "tablet" })} {
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "navbar header header"
      "navbar navbar-secondary main";
  }
`;

export const Basic = () => {
  // const [activeTab, setActiveTab] = useState<
  //   "home" | "resources" | "directory" | "calendar" | "settings"
  // >("home");

  // const onNavbarMount = useCallback<RefCallback<HTMLElement>>((node) => {
  //   if (!node) return;
  //   const anchors = node.getElementsByTagName("a");

  //   function handleClick(e: Event) {
  //     setActiveTab(
  //       (e.currentTarget as HTMLAnchorElement).id as typeof activeTab
  //     );
  //   }
  //   for (const anchor of anchors) {
  //     anchor.addEventListener("click", handleClick);
  //   }

  //   return () => {
  //     for (const anchor of anchors) {
  //       anchor.removeEventListener("click", handleClick);
  //     }
  //   };
  // }, []);

  return (
    <div className={styles}>
      <div style={{ gridArea: "header" }}>
        <HeaderStory />
      </div>
      <div style={{ gridArea: "navbar-secondary" }}>
        <NavbarSecondary>
          <NavbarSecondaryGroup dxTitle="General">
            <NavbarSecondaryItem dxIsActive>
              <NavbarSecondaryItemIcon
                dxBaseIcon="contact-01-stroke-standard"
                dxActiveIcon="contact-01-solid-standard"
              />
              <NavbarSecondaryItemText>Contact</NavbarSecondaryItemText>
            </NavbarSecondaryItem>
            <NavbarSecondaryItem>
              <NavbarSecondaryItemIcon
                dxBaseIcon="user-group-02-stroke-standard"
                dxActiveIcon="user-group-02-solid-standard"
              />
              <NavbarSecondaryItemText>Members</NavbarSecondaryItemText>
            </NavbarSecondaryItem>
          </NavbarSecondaryGroup>
          <NavbarSecondaryGroup dxTitle="Advanced">
            <NavbarSecondaryItem>
              <NavbarSecondaryItemIcon
                dxBaseIcon="contact-01-stroke-standard"
                dxActiveIcon="contact-01-solid-standard"
              />
              <NavbarSecondaryItemText>APIs</NavbarSecondaryItemText>
            </NavbarSecondaryItem>
          </NavbarSecondaryGroup>
        </NavbarSecondary>
      </div>
      <div style={{ gridArea: "main" }}>This be the main content</div>
      <div style={{ gridArea: "navbar" }}>
        <NavbarStory />
      </div>
    </div>
  );
};
