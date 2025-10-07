import type { Route } from "./+types/view-file.server-route";

import { LOG_RESOURCE_VIEWER } from "../resource-viewer.utils";

export async function loader(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    LOG_RESOURCE_VIEWER.debug("Fetching the resource to be able to view", {
      resourceId: args.params.id,
    });
    const resource = await ncclClient.resource.viewResource(args.params.id);
    LOG_RESOURCE_VIEWER.debug(
      "Successfully fetched the resource to view",
      resource
    );
    return resource;
  } catch (error) {
    const err = ncclClient.serializeError(error);
    LOG_RESOURCE_VIEWER.error(
      "Error when trying to fetch the resource for viewing",
      err
    );
    return err;
  }
}
