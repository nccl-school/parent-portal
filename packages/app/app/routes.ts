import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("features/landing/Landing.route.tsx"),
  route("sign-in/*", "features/sign-in/SignIn.route.tsx"),
] satisfies RouteConfig;
