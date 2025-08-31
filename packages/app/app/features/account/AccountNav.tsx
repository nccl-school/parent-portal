import { css } from "@linaria/core";
import { makeResponsive, makeRem } from "@nccl/theme";
import { NavLink } from "react-router";
import { classes } from "@stratum-ui/core/utils";
import { Typography } from "@nccl/components";

import { tabsGeneral, tabsPreferences } from "./account.utils";

import { NavGroup } from "../../components/nav/NavGroup";
import { NavItem } from "../../components/nav/NavItem";

const navStyles = css`
  ${makeResponsive({ from: "tablet" })} {
    grid-area: nav;
    margin: 0 auto;
    width: 100%;
    padding: ${makeRem(24)};
    background: white;
  }

  h2 {
    margin-bottom: ${makeRem(16)};
    width: ${makeRem(280)};
  }
`;

export function AccountNav({ className }: { className?: string }) {
  return (
    <nav className={classes(className, navStyles)}>
      <Typography dxVariant="heading4" dxNode="h2">
        Account Settings
      </Typography>
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
