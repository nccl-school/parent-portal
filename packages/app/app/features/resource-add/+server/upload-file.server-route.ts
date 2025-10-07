import type { CreateResourceResponse, ErrorResponse } from "@nccl/api/client";

import type { Route } from "./+types/upload-file.server-route";

export async function action(
  args: Route.ActionArgs
): Promise<
  | { status: "ok"; data: CreateResourceResponse }
  | { status: "error"; error: ErrorResponse }
> {
  const ncclClient = args.context.resolve("ncclClient");
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
