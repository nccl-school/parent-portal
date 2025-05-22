import { Outlet } from "react-router";

export default function DirectoryLayout() {
  return (
    <div>
      <h6>Directory</h6>
      <Outlet />
    </div>
  );
}
