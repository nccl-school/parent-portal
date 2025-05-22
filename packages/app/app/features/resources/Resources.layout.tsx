import { Outlet } from "react-router";

export default function ResourcesLayout() {
  return (
    <div>
      <h6>Resources</h6>
      <Outlet />
    </div>
  );
}
