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
    route("directory", "./features/directory/Directory.route.tsx", [
      // - /directory
      route("", "./features/directory-all/DirectoryAll.route.tsx"),
      route(
        "students",
        "./features/directory-students/DirectoryStudents.route.tsx"
      ),
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
    // - /account
    route("account", "./features/account/Account.route.tsx", [
      route("", "./features/account-general/AccountGeneral.route.tsx"),
      route(
        "security",
        "./features/account-security/AccountSecurity.route.tsx"
      ),
    ]),
    route("admin", "./features/admin/Admin.route.tsx", [
      index("./features/admin-users/AdminUsers.route.tsx"),
      route("resources", "./features/admin-resources/AdminResources.route.tsx"),
    ]),
  ]),

  // - /auth
  layout("./features/auth/Auth.layout.tsx", [
    route("sign-in", "./features/auth/AuthSignIn.route.tsx"),
    ...prefix("sign-up", [
      index("./features/auth/AuthAcceptInvite.route.tsx"),
      route("success", "./features/auth/AuthAcceptInviteSuccess.route.tsx"),
    ]),
    ...prefix("forgot-password", [
      index("./features/auth/AuthForgotPasswordIndex.route.tsx"),
      route("success", "./features/auth/AuthForgotPasswordSuccess.route.tsx"),
    ]),
    ...prefix("reset-password", [
      index("./features/auth/AuthResetPasswordIndex.route.tsx"),
      route("success", "./features/auth/AuthResetPasswordSuccess.route.tsx"),
    ]),
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
    ...prefix("auth", [
      route("/sign-out", "./api/api.auth.signOut.ts"),
      route("/sign-in/social/:provider", "./api/api.auth.signInSocial.ts"),
    ]),
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
  // test
  // route("/", "./features/test/Test.route.tsx"),
  route("/test-error", "./features/test/TestError.route.tsx"),
] satisfies RouteConfig;
