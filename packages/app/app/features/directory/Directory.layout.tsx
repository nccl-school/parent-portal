import { Outlet } from "react-router";

import { PageHeader } from "../../components/page";

export default function DirectoryLayout() {
  return (
    <>
      <PageHeader
        dxTitle="Directory"
        dxSubtitle="Discover families, students, and staff in the NCCL network"
      />
      <Outlet />
    </>
  );
}
