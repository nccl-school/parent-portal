import { Outlet } from "react-router";

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

export default function AdminLayout({ loaderData }: Route.ComponentProps) {
  if (!loaderData.hasAccess) {
    return <Unauthorized />;
  }
  return (
    <>
      <PageHeader
        dxTitle="Administration"
        dxSubtitle="Invite parents, manage groups, add content, send notifications, etc..."
      />
      <Outlet />
    </>
  );
}
