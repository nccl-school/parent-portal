import { Outlet } from "react-router";
import { useUser } from "@clerk/react-router";

import { PageHeader } from "../../components/page";

export default function HomeLayout() {
  const { user } = useUser();

  if (!user) return;

  return (
    <>
      <PageHeader dxTitle={`Welcome, ${user.firstName}!`} />
      <Outlet />
    </>
  );
}
