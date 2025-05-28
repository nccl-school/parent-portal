import { css } from "@linaria/core";
import { type IconNames, Tab, Tabs } from "@nccl/components";
import { makeCustom, makeResponsive } from "@nccl/theme";
import { href, NavLink, type NavLinkProps } from "react-router";

const tabs: (NavLinkProps & {
  baseIcon: IconNames;
  activeIcon: IconNames;
  copy: string;
})[] = [
  {
    to: href("/admin"),
    end: true,
    baseIcon: "contact-01-stroke-standard",
    activeIcon: "contact-01-solid-standard",
    copy: "Users",
  },
  {
    to: href("/admin/resources"),
    copy: "Resources",
    end: true,
    baseIcon: "folder-02-stroke-standard",
    activeIcon: "folder-02-solid-standard",
  },
];

const laptopStyles = css`
  ${makeResponsive({ to: "laptop" })} {
    display: none;
  }
  padding: 0 ${makeCustom("page--gutter-desktop")};
`;

export function AdminNavbar() {
  return (
    <div className={laptopStyles}>
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
    </div>
  );
}

/* <NavbarSecondary>
        <NavbarSecondaryGroup dxTitle="Manage">
          <ListItem to={href("/admin")} end>
            <NavbarSecondaryItemIcon
              dxBaseIcon="contact-01-stroke-standard"
              dxActiveIcon="contact-01-solid-standard"
            />
            <NavbarSecondaryItemText>Users</NavbarSecondaryItemText>
          </ListItem>
          <ListItem to={href("/admin/resources")} end>
            <NavbarSecondaryItemIcon
              dxBaseIcon="folder-02-stroke-standard"
              dxActiveIcon="folder-02-solid-standard"
            />
            <NavbarSecondaryItemText>Resources</NavbarSecondaryItemText>
          </ListItem>
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
      </NavbarSecondary> */
