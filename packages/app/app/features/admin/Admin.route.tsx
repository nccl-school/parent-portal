import { Outlet } from "react-router";
import { makeCustom } from "@nccl/theme";
import { css } from "@linaria/core";

import type { Route } from "./+types/Admin.route";
import { AdminNavbar } from "./AdminNavbar";

import { PageContainer } from "../..//components/page/PageContainer";
import { PageHeader } from "../../components/page";
import { isAdmin } from "../../utils/server";
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
  }
  .nav {
    grid-area: nav;
    max-width: ${makeCustom("container--max-width")};
    margin: 0 auto;
    width: 100%;
    position: sticky;
    top: ${makeCustom("header--height-desktop")};
    height: ${makeCustom("admin--tab-height-desktop")};
  }
  .main {
    grid-area: main;
    background: white;
    overflow: hidden;
  }
`;

export async function loader(loaderArgs: Route.LoaderArgs) {
  const hasAccess = await isAdmin(loaderArgs);
  return { hasAccess };
}

export default function AdminRoute({ loaderData }: Route.ComponentProps) {
  if (!loaderData.hasAccess) {
    return <Unauthorized />;
  }
  return (
    <PageContainer dxVariant="static" className={styles}>
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
    </PageContainer>
  );
}
