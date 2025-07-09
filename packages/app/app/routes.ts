import {
  type RouteConfig,
  index,
  layout,
  prefix,
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
      ...prefix("calendar", [
        index("./features/calendar-by-week/CalendarByWeek.route.tsx"),
        route("/by-day", "./features/calendar-by-day/CalendarByDay.route.tsx"),
      ]),
    ]),
    // - /more
    layout("./features/more/More.layout.tsx", [
      route("more", "./features/more/More.route.tsx"),
    ]),
    // -/profile
    layout("./features/profile/Profile.layout.tsx", [
      route("profile/*", "features/profile/Profile.route.tsx"),
    ]),
    route("admin", "./features/admin/Admin.route.tsx", [
      index("./features/admin-users/AdminUsers.route.tsx"),
      route("resources", "./features/admin-resources/AdminResources.route.tsx"),
    ]),
  ]),
  // - /sign-in/*
  route("sign-in/*", "features/sign-in/SignIn.route.tsx"),
  route("sign-up/*", "features/sign-up/SignUp.route.tsx"),
  // APIs
  ...prefix("api", [
    ...prefix("role", [route("/", "./api/api.role.getRoles.ts")]),
    ...prefix("suggestion", [
      route("/", "./api/api.suggestion.getManyOrCreateUnique.ts"),
      route("/:id", "./api/api.suggestion.getOrUpdateUnique.ts", [
        route("vote", "./api/api.suggestion.voteOnUnique.ts"),
      ]),
    ]),
    ...prefix("user", [
      route("/invite", "./api/api.user.inviteUsers.ts"),
      route("/resend-invite/:id", "./api/api.user.resendInvite.ts"),
      route("/:id", "./api/api.user.getUserById.ts", [
        route("role", "./api/api.user.updateUserRole.ts"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
