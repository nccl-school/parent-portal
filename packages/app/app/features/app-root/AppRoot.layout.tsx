import {
  href,
  NavLink,
  Outlet,
  useNavigate,
  type NavLinkProps,
} from "react-router";
import { css } from "@linaria/core";
import { makeColor, makeCustom, makeRem, makeResponsive } from "@nccl/theme";
import {
  Button,
  Header,
  HeaderActions,
  HeaderActionsItem,
  Navbar,
  NavbarGroup,
  NavbarItem,
  NavbarItemIcon,
  NavbarItemText,
  NavbarLogo,
  Typography,
} from "@nccl/components";
import type { ReactNode } from "react";

import type { Route } from "./+types/AppRoot.layout";
import { AppRootHeaderUser } from "./AppRootHeaderUser";

import { CLASSES, getMobileTitle } from "../../utils/isomorphic";
import { ensureSession, getNCCLClient } from "../../utils/server";
import { AuthSignOutButton } from "../auth/AuthSignOutButton";
import { Restrict } from "../auth/Restrict";

const stylesHead = css`
  :global() {
    body {
      display: grid;
      background-image: linear-gradient(
        75deg,
        hsla(0deg, 0%, 100%, 0.4) 0%,
        hsla(180deg, 100%, 97%, 0.4) 26%,
        hsla(180deg, 100%, 95%, 0.4) 39%,
        hsla(181deg, 100%, 94%, 0.4) 50%,
        hsla(182deg, 100%, 94%, 0.4) 61%,
        hsla(202deg, 100%, 94%, 0.4) 74%,
        hsla(300deg, 100%, 94%, 0.4) 100%
      );

      ${makeResponsive({ to: "laptop" })} {
        height: 100dvh;
        width: 100dvw;
        overflow: hidden;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          "head"
          "main"
          "nav";
      }

      ${makeResponsive({ from: "laptop" })} {
        height: 100vh;
        grid-template-rows: auto 1fr;
        grid-template-columns: auto 1fr;
        grid-template-areas:
          "nav head"
          "nav main";
      }
    }
  }

  grid-area: head;
  width: inherit;

  ${makeResponsive({ to: "laptop" })} {
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-items: center;
    border-bottom: 0;

    ul,
    li {
      height: ${makeCustom("header--height-desktop")};
      img {
        height: 50%;
        width: auto;
      }
    }
  }

  ${makeResponsive({ from: "laptop" })} {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
  }
`;

const stylesMain = css`
  grid-area: main;
  height: 100%;
  overflow: hidden;
  width: inherit;

  ${makeResponsive({ to: "laptop" })} {
    padding: 0 ${makeCustom("page--gutter-mobile")};
    overflow: auto;
  }

  ${makeResponsive({ from: "laptop" })} {
    width: 100%;
  }
`;

const stylesNav = css`
  grid-area: nav;
  position: sticky;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);

  ${makeResponsive({ to: "laptop" })} {
    height: ${makeRem(90)};
    width: 100%;
  }

  ${makeResponsive({ from: "laptop" })} {
    top: 0;
    height: 100vh;
    box-shadow:
      6px 0px 5px ${makeColor("neutral-light-50", { opacity: 0.7 })},
      7px 0px 19px 8px ${makeColor("neutral-light-50", { opacity: 0.3 })};
  }
`;

export async function loader(args: Route.LoaderArgs) {
  const { session } = await ensureSession(args);
  const ncclClient = getNCCLClient(args);
  const currentUser = await ncclClient.user.getCurrentUser();
  return { session, currentUser };
}

export default function AppRootLayout(args: Route.ComponentProps) {
  const navigate = useNavigate();

  const matchesLength = args.matches.length;
  const lastMatch = args.matches[matchesLength - 1];
  const pathname = lastMatch ? lastMatch.pathname : "/";

  return (
    <>
      <Header className={stylesHead}>
        <HeaderActions className={CLASSES.mobileOnly}>
          <HeaderActionsItem>
            {pathname === "/" ? (
              <img
                alt="nccl-logo"
                src="/images/ncc-logo-shell-only-500x500-transparent.png"
              />
            ) : (
              <Button
                onClick={() => navigate(-1)}
                dxIcon="arrow-left-01-stroke-standard"
                dxVariant="icon"
                dxSize="lg"
                dxColor="neutral-dark-1200"
              />
            )}
          </HeaderActionsItem>
        </HeaderActions>
        <HeaderActions className={CLASSES.mobileOnly}>
          <HeaderActionsItem>
            {pathname !== "/" && (
              <Typography dxVariant="heading5" dxNode="h1">
                {getMobileTitle(args.matches)}
              </Typography>
            )}
          </HeaderActionsItem>
        </HeaderActions>
        <HeaderActions>
          <HeaderActionsItem>
            <AppRootHeaderUser />
          </HeaderActionsItem>
        </HeaderActions>
      </Header>
      <main className={stylesMain}>
        <Outlet />
      </main>
      <Navbar className={stylesNav}>
        <NavbarGroup>
          <NavbarLogo
            dxSrc="/images/ncc-logo-shell-only-500x500-transparent.png"
            dxAlt="nccl-logo"
          />
          <RootNavbarItem to={href("/")}>
            <NavbarItemIcon
              dxBaseIcon="home-06-stroke-standard"
              dxActiveIcon="home-06-solid-standard"
            />
            <NavbarItemText>Home</NavbarItemText>
          </RootNavbarItem>
          <RootNavbarItem to={href("/resources/*", { "*": "" })}>
            <NavbarItemIcon
              dxBaseIcon="folder-02-stroke-standard"
              dxActiveIcon="folder-02-solid-standard"
            />
            <NavbarItemText>Resources</NavbarItemText>
          </RootNavbarItem>
          <RootNavbarItem to={href("/directory")}>
            <NavbarItemIcon
              dxBaseIcon="contact-01-stroke-standard"
              dxActiveIcon="contact-01-solid-standard"
            />
            <NavbarItemText>Directory</NavbarItemText>
          </RootNavbarItem>
          <RootNavbarItem to={href("/calendar")}>
            <NavbarItemIcon
              dxBaseIcon="calendar-03-stroke-standard"
              dxActiveIcon="calendar-03-solid-standard"
            />
            <NavbarItemText>Calendar</NavbarItemText>
          </RootNavbarItem>
          <RootNavbarItem to={href("/more")}>
            <NavbarItemIcon
              dxBaseIcon="more-01-stroke-standard"
              dxActiveIcon="more-01-solid-standard"
            />
            <NavbarItemText>More</NavbarItemText>
          </RootNavbarItem>
          <Restrict role="ADMIN">
            <RootNavbarItem to="/admin">
              <NavbarItemIcon
                dxBaseIcon="tools-stroke-standard"
                dxActiveIcon="tools-solid-standard"
              />
              <NavbarItemText>Admin</NavbarItemText>
            </RootNavbarItem>
          </Restrict>
        </NavbarGroup>
        <NavbarGroup>
          <NavbarItem>
            <NavbarItemIcon
              dxBaseIcon="help-circle-stroke-standard"
              dxActiveIcon="help-circle-stroke-standard"
            />
            <NavbarItemText>Help</NavbarItemText>
          </NavbarItem>
          <AuthSignOutButton>
            <NavbarItem>
              <NavbarItemIcon
                dxBaseIcon="logout-01-stroke-standard"
                dxActiveIcon="logout-01-stroke-standard"
              />
              <NavbarItemText>Logout</NavbarItemText>
            </NavbarItem>
          </AuthSignOutButton>
        </NavbarGroup>
      </Navbar>
    </>
  );
}

function RootNavbarItem({
  children,
  ...restProps
}: NavLinkProps & { children: ReactNode }) {
  return (
    <li>
      <NavLink {...restProps}>
        {({ isActive }) => (
          <NavbarItem dxIsActive={isActive}>{children}</NavbarItem>
        )}
      </NavLink>
    </li>
  );
}
