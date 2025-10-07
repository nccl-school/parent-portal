import { CreateFolderRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.resource.folder";

export async function action(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    switch (args.request.method) {
      case "POST": {
        const body = await args.request.json();
        const folder = await CreateFolderRequestSchema.parseAsync(body);
        const json = await ncclClient.resource.createFolder(folder);
        return json;
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
