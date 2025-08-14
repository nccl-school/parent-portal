import { ErrorSet, CreateGoogleDocRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.resource.google-doc.load";

import { getNCCLClient } from "../utils/server";

export async function action(args: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    if (args.request.method !== "POST") {
      throw new ErrorSet.methodNotAllowed(args.request.method);
    }
    const formData = await args.request.formData();
    const formObj = Object.fromEntries(formData.entries());
    const body = await CreateGoogleDocRequestSchema.parseAsync({
      ...formObj,
      owner: "school",
    });
    const json = await ncclClient.resource.createGoogleDoc(body);
    return json;
  } catch (error) {
    console.log(error);
    return ncclClient.serializeError(error);
  }
}
