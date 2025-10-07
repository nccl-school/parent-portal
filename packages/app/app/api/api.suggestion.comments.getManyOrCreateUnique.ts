import { CreateSuggestionCommentsRequestSchema } from "@nccl/api/client";
import { z } from "zod";

import type { Route } from "./+types/api.suggestion.comments.getManyOrCreateUnique";

import { validateFormData } from "../utils/isomorphic";

/**
 * Get a list of comments that have been added
 * to a suggestion
 */
export async function loader(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");
  try {
    const roles = await ncclClient.suggestion.getCommentsList(args.params.id);
    return roles;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}

/**
 * Add a new comment to a suggestion
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    const formData = await args.request.formData();

    const body = await validateFormData(
      CreateSuggestionCommentsRequestSchema.extend({
        isAnonymous: z.coerce.boolean().default(false),
      }),
      formData
    );
    const res = await ncclClient.suggestion.addCommentToSuggestion(
      args.params.id,
      {
        comment: body.comment,
        isAnonymous: body.isAnonymous ?? false,
      }
    );
    return res;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
