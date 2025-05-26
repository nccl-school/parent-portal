import { Outlet } from "react-router";
import { css } from "@linaria/core";
import {
  NavbarSecondary,
  NavbarSecondaryGroup,
  NavbarSecondaryItem,
  NavbarSecondaryItemIcon,
  NavbarSecondaryItemText,
} from "@nccl/components";
import { makeColor } from "@nccl/theme";

import type { Route } from "./+types/Admin.layout";

import { PageHeader } from "../../components/page";
import { RBAC } from "../auth/auth.utils";
import { Unauthorized } from "../auth/Unauthorized";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const rbac = new RBAC(loaderArgs);
  const isAdmin = await rbac.isAdmin();
  if (!isAdmin) {
    return { hasAccess: false };
  }

  return { hasAccess: true };
}

const styles = css`
  /* TODO: Mobile styles next */
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "title title"
    "nav main";
  height: 100%;
  width: 100%;

  .title {
    grid-area: title;
    background: white;
    border-bottom: 1px solid ${makeColor("neutral-dark-50", { opacity: 0.2 })};
  }
  .nav {
    grid-area: nav;
    background: white;
  }
  .main {
    grid-area: main;
  }
`;

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  if (!loaderData.hasAccess) {
    return <Unauthorized />;
  }
  return (
    <div className={styles}>
      <PageHeader
        dxTitle="Administration"
        dxSubtitle="Invite parents, manage groups, add content, send notifications, etc..."
        className="title"
      />
      <div className="nav">
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
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
