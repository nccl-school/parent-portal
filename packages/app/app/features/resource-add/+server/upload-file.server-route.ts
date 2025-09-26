import type { CreateResourceResponse, ErrorResponse } from "@nccl/api/client";

import type { Route } from "./+types/upload-file.server-route";

import { getNCCLClient } from "../../../utils/server";

export async function action(
  args: Route.ActionArgs
): Promise<
  | { status: "ok"; data: CreateResourceResponse }
  | { status: "error"; error: ErrorResponse }
> {
  const ncclClient = getNCCLClient(args);
  try {
    const formData = await args.request.formData();
    const resource = await ncclClient.resource.uploadFile(formData);
    return {
      status: "ok",
      data: resource,
    };
  } catch (error) {
    return {
      status: "error",
      error: ncclClient.serializeError(error),
    };
  }
}
