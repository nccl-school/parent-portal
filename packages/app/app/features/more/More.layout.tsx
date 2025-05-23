import { Outlet } from "react-router";

import { PageHeader } from "../../components/page";

export default function MoreLayout() {
  return (
    <>
      <PageHeader
        dxTitle="More Resources"
        dxSubtitle="Explore more actions you can take as parents"
      />
      <Outlet />
    </>
  );
}
