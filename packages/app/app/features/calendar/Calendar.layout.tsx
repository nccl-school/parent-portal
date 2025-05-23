import { Outlet } from "react-router";

import { PageHeader } from "../../components/page";

export default function CalendarLayout() {
  return (
    <>
      <PageHeader
        dxTitle="Calendar"
        dxSubtitle="View and get details on up and coming NCCL events"
      />
      <Outlet />
    </>
  );
}
