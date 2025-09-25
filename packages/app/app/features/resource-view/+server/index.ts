import { prefix, route } from "@react-router/dev/routes";

export const resourceViewServerRoutes = prefix("/resource-view/server", [
  route(":id", "features/resource-view/+server/view-file.server-route.ts"),
]);
