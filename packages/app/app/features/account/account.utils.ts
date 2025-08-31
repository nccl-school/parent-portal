import type { IconNames } from "@nccl/components";
import { href, type NavLinkProps } from "react-router";

import type { NavItemPropsCustom } from "../../components/nav/NavItem";

export const tabsGeneral: (NavItemPropsCustom &
  Omit<NavLinkProps, "children">)[] = [
  {
    to: href("/account/general"),
    children: "Profile",
    end: true,
    dxBaseIcon: "user-square-stroke-standard",
    dxActiveIcon: "user-square-solid-standard",
  },
  {
    to: href("/account/security"),
    children: "Security",
    end: true,
    dxBaseIcon: "security-lock-stroke-standard",
    dxActiveIcon: "security-lock-solid-standard",
  },
];

export const tabsPreferences: (NavLinkProps & {
  dxBaseIcon: IconNames;
  dxActiveIcon: IconNames;
  children: string;
})[] = [
  {
    to: href("/account/notifications"),
    children: "Notification Preferences",
    end: true,
    dxBaseIcon: "notification-01-stroke-standard",
    dxActiveIcon: "notification-01-solid-standard",
  },
];
