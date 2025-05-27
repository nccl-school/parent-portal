import { Outlet } from "react-router";
import { makeColor } from "@nccl/theme";
import { css } from "@linaria/core";

import type { Route } from "./+types/Admin.route";
import { AdminNavbar } from "./AdminNavbar";

import { PageHeader } from "../../components/page";
import { RBAC } from "../auth/auth.utils";
import { Unauthorized } from "../auth/Unauthorized";

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

// export async function loader(loaderArgs: Route.LoaderArgs) {
//   // const rbac = new RBAC(loaderArgs);
//   // const isAdmin = await rbac.isAdmin();
//   // if (!isAdmin) {
//   //   return { hasAccess: false };
//   // }

//   // return { hasAccess: true };
//   return { hasAccess: true };
// }

export default function AdminRoute() {
  console.log("🔁 Admin.route.tsx");

  // if (!loaderData.hasAccess) {
  //   return <Unauthorized />;
  // }
  return (
    <div className={styles}>
      <PageHeader
        dxTitle="Administration"
        dxSubtitle="Invite parents, manage groups, add content, send notifications, etc..."
        className="title"
      />
      <AdminNavbar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
