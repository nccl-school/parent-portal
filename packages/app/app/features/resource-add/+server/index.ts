import { prefix, route } from "@react-router/dev/routes";

export const resourceAddServerRoutes = prefix("/resource-add", [
  route("file", "features/resource-add/+server/upload-file.server-route.ts"),
]);
