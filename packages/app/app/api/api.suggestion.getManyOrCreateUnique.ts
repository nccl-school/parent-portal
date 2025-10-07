import { CreateSuggestionRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.user.updateUserRole";

import { validateFormData } from "../utils/isomorphic";

/**
 * Create a new suggestion
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    const formData = await args.request.formData();
    const body = await validateFormData(
      CreateSuggestionRequestSchema,
      formData
    );
    const res = await ncclClient.suggestion.createSuggestion(body);
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
