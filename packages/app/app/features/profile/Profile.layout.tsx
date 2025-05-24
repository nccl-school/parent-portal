import { Outlet } from "react-router";

import { PageHeader } from "../../components/page";

export default function ProfileLayout() {
  return (
    <>
      <PageHeader
        dxTitle="Profile"
        dxSubtitle="Update your profile, manage your password, view connected devices, etc..."
      />
      <Outlet />
    </>
  );
}
