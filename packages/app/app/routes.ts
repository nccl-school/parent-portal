import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./features/app-root/AppRoot.layout.tsx", [
    // - /
    layout("./features/home/Home.layout.tsx", [
      index("./features/home/Home.index.tsx"),
    ]),
    // - /resources
    layout("./features/resources/Resources.layout.tsx", [
      route("resources/*", "./features/resources/Resources.route.tsx"),
    ]),
    // - /directory
    layout("./features/directory/Directory.layout.tsx", [
      route("directory", "./features/directory/Directory.route.tsx"),
    ]),
    // - /calendar
    layout("./features/calendar/Calendar.layout.tsx", [
      ...prefix("calendar", [
        index("./features/calendar-by-week/CalendarByWeek.route.tsx"),
        route("by-day", "./features/calendar-by-day/CalendarByDay.route.tsx"),
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

  // - /auth
  layout("./features/auth/Auth.layout.tsx", [
    route("/sign-in", "features/auth/AuthSignIn.route.tsx"),
    // route("/forgot-password", "features/auth/AuthForgotPassword.route.tsx"),
    route("accept-invite", "./features/auth/AuthAcceptInvite.route.tsx"),
  ]),

  // APIs
  ...prefix("api", [
    ...prefix("role", [route("/", "./api/api.role.getRoles.ts")]),
    ...prefix("resource", [
      route(":id", "./api/api.resource.ts"),
      route(":id/meta", "./api/api.resource.meta.ts"),
      route(":id/move", "./api/api.resource.move.ts"),
      route(":id/access", "./api/api.resource.access.ts"),
      route(":id/access/school", "./api/api.resource.access.school.ts"),
      route("folder", "./api/api.resource.folder.ts"),
      route("google-doc/load", "./api/api.resource.google-doc.load.ts"),
      route("tree/*", "./api/api.resource.tree.ts"),
    ]),
    ...prefix("suggestion", [
      route("/", "./api/api.suggestion.getManyOrCreateUnique.ts"),
      route("/comment/:id", "./api/api.suggestion.comment.ts"),
      route("/:id", "./api/api.suggestion.getOrUpdateUnique.ts", [
        route("vote", "./api/api.suggestion.voteOnUnique.ts"),
        route(
          "comment",
          "./api/api.suggestion.comments.getManyOrCreateUnique.ts"
        ),
      ]),
    ]),
    ...prefix("auth", [route("/sign-out", "./api/api.auth.signOut.ts")]),
    ...prefix("account", [
      route("/invite", "./api/api.account.inviteUsers.ts"),
    ]),
    ...prefix("user", [
      route("/", "./api/api.user.ts"),
      route("/resend-invite/:id", "./api/api.user.resendInvite.ts"),
      route("/:id", "./api/api.user.getUserById.ts", [
        route("role", "./api/api.user.updateUserRole.ts"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
