import z from "zod/v4";

import type { Route } from "./+types/api.user.inviteUsers";

import { getNCCLClient } from "../utils/server";
import { userRolesSchema } from "../models/user.model";
import { createValidator } from "../utils/isomorphic";

export const inviteUsersApiRequestSchema = z.object({
  email_addresses: z
    .string()
    .transform((val) => val.split(",").map((s) => s.trim()))
    .pipe(z.array(z.email({ pattern: z.regexes.html5Email }))),
  role: userRolesSchema,
});
export const validateInviteUsers = createValidator(inviteUsersApiRequestSchema);
export type InviteUsersApiRequest = z.infer<typeof inviteUsersApiRequestSchema>;

/**
 * Server action to invite a user
 */
export async function action(args: Route.ActionArgs) {
  const ncclClient = getNCCLClient(args);

  try {
    const suggestions = await ncclClient.suggestion.getSuggestionList();
    return suggestions;
  } catch (error) {
    return ncclClient.serializeError(error);
  }
}
