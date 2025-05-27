import {
  NavbarSecondary,
  NavbarSecondaryItem,
  NavbarSecondaryGroup,
  // NavbarSecondaryItemIcon,
  NavbarSecondaryItemText,
  NavbarSecondaryItemIcon,
} from "@nccl/components";
import type { ReactNode } from "react";
import { href, NavLink, type NavLinkProps } from "react-router";

function ListItem({
  children,
  ...navLinkProps
}: NavLinkProps & { children: ReactNode }) {
  return (
    <li>
      <NavLink {...navLinkProps}>
        {({ isActive }) => {
          return (
            <NavbarSecondaryItem dxIsActive={isActive}>
              {children}
            </NavbarSecondaryItem>
          );
        }}
      </NavLink>
    </li>
  );
}

export function AdminNavbar() {
  return (
    <div className="nav">
      <NavbarSecondary>
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
      </NavbarSecondary>
    </div>
  );
}
