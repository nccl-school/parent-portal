import { css } from "@linaria/core";
import { Tab, Tabs, type IconNames } from "@nccl/components";
import { NavLink, Outlet, href, type NavLinkProps } from "react-router";
import { makeCustom, makeRem } from "@nccl/theme";

import { PageHeader } from "../../components/page";
import { PageContainer } from "../../components/page/PageContainer";

const tabs: (NavLinkProps & {
  baseIcon: IconNames;
  activeIcon: IconNames;
  copy: string;
})[] = [
  {
    to: href("/directory"),
    copy: "Parents, Staff, Admins",
    end: true,
    baseIcon: "contact-01-stroke-standard",
    activeIcon: "contact-01-solid-standard",
  },
  {
    to: href("/directory/students"),
    copy: "Students",
    end: true,
    baseIcon: "folder-02-stroke-standard",
    activeIcon: "folder-02-solid-standard",
  },
];

const styles = css`
  /* TODO: Mobile styles next */
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    "title"
    "nav"
    "main";
  height: 100%;
  width: 100%;
`;

const headStyles = css`
  grid-area: title;
`;

const navStyles = css`
  grid-area: nav;
  max-width: ${makeCustom("container--max-width")};
  margin: 0 auto;
  width: 100%;
  position: sticky;
  top: ${makeCustom("header--height-desktop")};
  height: ${makeCustom("admin--tab-height-desktop")};
`;
const mainStyles = css`
  max-width: ${makeCustom("container--max-width")};
  grid-area: main;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  padding-top: ${makeRem(16)};
  & > * {
    background: white;
  }
`;

export default function DirectoryRoute() {
  return (
    <PageContainer dxVariant="static" className={styles}>
      <PageHeader
        dxTitle="Directory"
        dxSubtitle="Discover families, students, and staff in the NCCL network"
        className={headStyles}
      />
      <nav className={navStyles}>
        <Tabs>
          {tabs.map(
            ({ baseIcon: _, activeIcon: __, copy, ...navLinkProps }, i) => (
              <li key={i.toString()}>
                <NavLink {...navLinkProps}>
                  {({ isActive }) => <Tab dxActive={isActive}>{copy}</Tab>}
                </NavLink>
              </li>
            )
          )}
        </Tabs>
      </nav>
      <div className={mainStyles}>
        <Outlet />
      </div>
    </PageContainer>
  );
}
