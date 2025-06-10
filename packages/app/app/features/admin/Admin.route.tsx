import { Outlet } from "react-router";
import { makeColor } from "@nccl/theme";
import { css } from "@linaria/core";

import type { Route } from "./+types/Admin.route";
import { AdminNavbar } from "./AdminNavbar";

import { PageHeader } from "../../components/page";
import { RBAC } from "../../utils/server/utils.server.auth";
import { Unauthorized } from "../auth/Unauthorized";

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

  .title {
    grid-area: title;
    background: white;
  }
  .nav {
    grid-area: nav;
    background: white;
    border-bottom: 1px solid ${makeColor("neutral-dark-50", { opacity: 0.2 })};
  }
  .main {
    grid-area: main;
  }
`;

export async function loader(loaderArgs: Route.LoaderArgs) {
  const rbac = new RBAC(loaderArgs);
  const isAdmin = await rbac.isAdmin();
  if (!isAdmin) {
    return { hasAccess: false };
  }

  return { hasAccess: true };
}

export default function AdminRoute({ loaderData }: Route.ComponentProps) {
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
        <AdminNavbar />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
