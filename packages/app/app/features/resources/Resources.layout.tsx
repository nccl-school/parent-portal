import { Outlet } from "react-router";

import { PageHeader } from "../../components/page";

export default function ResourcesLayout() {
  return (
    <>
      <PageHeader
        dxTitle="Resources"
        dxSubtitle="Quick access to important NCCL documents and contacts"
      />
      <Outlet />
    </>
  );
}
