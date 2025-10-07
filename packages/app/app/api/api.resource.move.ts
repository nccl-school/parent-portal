import { MoveResourceRequestSchema } from "@nccl/api/client";
import z from "zod";

import type { Route } from "./+types/api.resource.move";

import { validateFormData } from "../utils/isomorphic";

export async function action(args: Route.LoaderArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    switch (args.request.method) {
      case "PUT": {
        const formData = await args.request.formData();
        const body = await validateFormData(
          MoveResourceRequestSchema.extend({
            parentResourceId: z.string().min(1, {
              message: "Please select a new destination for the resource",
            }),
          }),
          formData
        );
        const json = await ncclClient.resource.move(
          args.params.id,
          body.parentResourceId
        );
        return json;
      }

      default:
        break;
    }
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
