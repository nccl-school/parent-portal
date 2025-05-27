import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./features/root/Root.layout.tsx", [
    // - /
    index("./features/home/Home.index.tsx"),
    // - /resources
    layout("./features/resources/Resources.layout.tsx", [
      route("resources", "./features/resources/Resources.route.tsx"),
    ]),
    // - /directory
    layout("./features/directory/Directory.layout.tsx", [
      route("directory", "./features/directory/Directory.route.tsx"),
    ]),
    // - /calendar
    layout("./features/calendar/Calendar.layout.tsx", [
      route("calendar", "./features/calendar/Calendar.route.tsx"),
    ]),
    // - /more
    layout("./features/more/More.layout.tsx", [
      route("more", "./features/more/More.route.tsx"),
    ]),
    // -/profile
    layout("./features/profile/Profile.layout.tsx", [
      route("profile/*", "features/profile/Profile.route.tsx"),
    ]),
    // -/admin
    route("admin", "./features/admin/Admin.route.tsx", [
      layout("./features/admin-users/AdminUsers.layout.tsx", [
        index("./features/admin-users/AdminUsers.route.tsx"),
      ]),
      route("resources", "./features/admin-resources/AdminResources.route.tsx"),
    ]),
  ]),
  // - /sign-in/*
  route("sign-in/*", "features/sign-in/SignIn.route.tsx"),
] satisfies RouteConfig;
