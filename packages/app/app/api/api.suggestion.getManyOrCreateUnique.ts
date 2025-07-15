import { CreateSuggestionRequestSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.user.updateUserRole";

import { validateFormData } from "../utils/isomorphic";
import { getNCCLClient } from "../utils/server";

/**
 * Get a list of suggestions
 */
export async function loader(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);
  try {
    const url = new URL(args.request.url);
    const search = url.searchParams.get("search") || undefined;
    const roles = await ncclClient.suggestion.getSuggestionList({ search });
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

/**
 * Create a new suggestion
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);

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
