import { css } from "@linaria/core";
import { makeResponsive, makeRem, makeCustom } from "@nccl/theme";
import { NavLink } from "react-router";
import { classes } from "@stratum-ui/core/utils";

import { tabsGeneral, tabsPreferences } from "./account.utils";

import { NavGroup } from "../../components/nav/NavGroup";
import { NavItem } from "../../components/nav/NavItem";

const navStyles = css`
  ${makeResponsive({ from: "tablet" })} {
    grid-area: nav;
    max-width: ${makeCustom("container--max-width")};
    margin: 0 auto;
    width: 100%;
    background: white;
    padding: ${makeRem(24)};
  }
`;

export function AccountNav({ className }: { className?: string }) {
  return (
    <nav className={classes(className, navStyles)}>
      <NavGroup dxTitle="Basic">
        {tabsGeneral.map(
          ({ children, dxBaseIcon, dxActiveIcon, ...restNavLinkProps }) => (
            <li>
              <NavLink {...restNavLinkProps}>
                {({ isActive }) => (
                  <NavItem
                    key={children}
                    dxActiveIcon={dxActiveIcon}
                    dxBaseIcon={dxBaseIcon}
                    isActive={isActive}
                  >
                    {children}
                  </NavItem>
                )}
              </NavLink>
            </li>
          )
        )}
      </NavGroup>
      <NavGroup dxTitle="Preferences">
        {tabsPreferences.map(
          ({ children, dxBaseIcon, dxActiveIcon, ...restNavLinkProps }) => (
            <li>
              <NavLink {...restNavLinkProps}>
                {({ isActive }) => (
                  <NavItem
                    key={children}
                    dxActiveIcon={dxActiveIcon}
                    dxBaseIcon={dxBaseIcon}
                    isActive={isActive}
                  >
                    {children}
                  </NavItem>
                )}
              </NavLink>
            </li>
          )
        )}
      </NavGroup>
    </nav>
  );
}
