import {
  Navbar,
  NavbarItem,
  NavbarItemIcon,
  NavbarItemText,
} from "@nccl/components";
import type { ReactNode } from "react";
import { NavLink, type NavLinkProps } from "react-router";

function RootNavbarItem({
  children,
  ...restProps
}: NavLinkProps & { children: ReactNode }) {
  return (
    <NavLink {...restProps}>
      {({ isActive }) => (
        <NavbarItem dxIsActive={isActive}>{children}</NavbarItem>
      )}
    </NavLink>
  );
}

export function RootNavbar() {
  return (
    <Navbar>
      <RootNavbarItem to="/">
        <NavbarItemIcon
          dxBaseIcon="home-06-stroke-standard"
          dxActiveIcon="home-06-solid-standard"
        />
        <NavbarItemText>Home</NavbarItemText>
      </RootNavbarItem>
      <RootNavbarItem to="/resources">
        <NavbarItemIcon
          dxBaseIcon="folder-02-stroke-standard"
          dxActiveIcon="folder-02-solid-standard"
        />
        <NavbarItemText>Resources</NavbarItemText>
      </RootNavbarItem>
      <RootNavbarItem to="/directory">
        <NavbarItemIcon
          dxBaseIcon="contact-01-stroke-standard"
          dxActiveIcon="contact-01-solid-standard"
        />
        <NavbarItemText>Directory</NavbarItemText>
      </RootNavbarItem>
      <RootNavbarItem to="/calendar">
        <NavbarItemIcon
          dxBaseIcon="calendar-03-stroke-standard"
          dxActiveIcon="calendar-03-solid-standard"
        />
        <NavbarItemText>Calendar</NavbarItemText>
      </RootNavbarItem>
      <RootNavbarItem to="/settings">
        <NavbarItemIcon
          dxBaseIcon="more-01-stroke-standard"
          dxActiveIcon="more-01-solid-standard"
        />
        <NavbarItemText>More</NavbarItemText>
      </RootNavbarItem>
    </Navbar>
  );
}
