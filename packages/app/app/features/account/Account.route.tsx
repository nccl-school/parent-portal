import { css } from "@linaria/core";
import { makeCustom, makeRem } from "@nccl/theme";
import {
  NavbarSecondary,
  NavbarSecondaryItem,
  NavbarSecondaryItemIcon,
  NavbarSecondaryItemText,
  type IconNames,
} from "@nccl/components";
import { type NavLinkProps, href, NavLink, Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { PageHeader } from "../../components/page";
import { PageContainer } from "../../components/page/PageContainer";

const tabs: (NavLinkProps & {
  baseIcon: IconNames;
  activeIcon: IconNames;
  copy: string;
})[] = [
  {
    to: href("/account"),
    copy: "General",
    end: true,
    baseIcon: "contact-01-stroke-standard",
    activeIcon: "contact-01-solid-standard",
  },
  {
    to: href("/account/security"),
    copy: "Security",
    end: true,
    baseIcon: "folder-02-stroke-standard",
    activeIcon: "folder-02-solid-standard",
  },
];

const styles = css`
  /* TODO: Mobile styles next */
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "title title"
    "nav main";
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
  background: white;
  padding: ${makeRem(24)};
  nav {
    padding-right: ${makeRem(24)};
  }
`;
const mainStyles = css`
  grid-area: main;
  background: white;
  overflow: hidden;
`;

export default function AccountRoute() {
  return (
    <PageContainer dxVariant="static" className={styles}>
      <PageHeader dxTitle="Account Settings" className={headStyles} />
      <div className={navStyles}>
        <NavbarSecondary>
          {tabs.map(
            ({ baseIcon: _, activeIcon: __, copy, ...navLinkProps }, i) => (
              <NavLink {...navLinkProps}>
                {({ isActive }) => (
                  <NavbarSecondaryItem key={i.toString()} dxIsActive={isActive}>
                    <Fragment>
                      <NavbarSecondaryItemIcon
                        dxBaseIcon="contact-01-stroke-standard"
                        dxActiveIcon="contact-01-solid-standard"
                      />
                      <NavbarSecondaryItemText>{copy}</NavbarSecondaryItemText>
                    </Fragment>
                  </NavbarSecondaryItem>
                )}
              </NavLink>
            )
          )}
        </NavbarSecondary>
      </div>
      <div className={mainStyles}>
        <Outlet />
      </div>
    </PageContainer>
  );
}
