import { UpdateResourceMetaRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.resource.meta";

import { validateFormData } from "../utils/isomorphic";
import { getNCCLClient } from "../utils/server";

export async function action(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    switch (args.request.method) {
      case "PUT": {
        const formData = await args.request.formData();
        const body = await validateFormData(
          UpdateResourceMetaRequestSchema,
          formData
        );
        const json = await ncclClient.resource.updateMeta(args.params.id, body);
        return json;
      }

      default:
        break;
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
