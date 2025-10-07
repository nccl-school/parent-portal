import { prefix, route } from "@react-router/dev/routes";

export const resourceViewServerRoutes = prefix("/resource-viewer/server", [
  route(":id", "features/resource-viewer/+server/view-file.server-route.ts"),
]);
