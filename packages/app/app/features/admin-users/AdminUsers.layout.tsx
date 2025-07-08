import { Outlet } from "react-router";

import { InnerPageHeader } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [
    { title: assembleTitle("Users | Admin") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AdminUsersLayout() {
  return (
    <>
      <InnerPageHeader dxTitle="Users" />
      <Outlet />
    </>
  );
}
