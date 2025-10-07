import z from "zod";
import { SuggestionVoteTypeSchema } from "@nccl/api/client";

import type { Route } from "./+types/api.suggestion.voteOnUnique";

import { validateFormData } from "../utils/isomorphic";

/**
 * Server action to invite a user
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = args.context.resolve("ncclClient");

  try {
    const formData = await args.request.formData();
    const body = await validateFormData(
      z.object({ suggestion_id: z.string(), type: SuggestionVoteTypeSchema }),
      formData
    );
    await ncclClient.suggestion.likeOrDislike(body.suggestion_id, {
      type: body.type,
    });
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
