import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./features/root/Root.layout.tsx", [
    index("features/root/Root.index.tsx"),
  ]),
  route("sign-in/*", "features/sign-in/SignIn.route.tsx"),
] satisfies RouteConfig;
