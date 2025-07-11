import type { User as ClerkUser } from "@clerk/backend";

import { ErrorSet } from "./util.errors.js";

export function findClerkUserPrimaryEmail(clerkUser: Omit<ClerkUser, "_raw">) {
  const clerkUserPrimaryEmail = clerkUser.emailAddresses.reduce<
    string | undefined
  >((accum, emailMeta) => {
    if (emailMeta.id === clerkUser.primaryEmailAddressId) {
      return emailMeta.emailAddress;
    }
    return accum;
  }, undefined);
  const { id, firstName, lastName } = clerkUser;
  if (!clerkUserPrimaryEmail) {
    throw new ErrorSet.serverError(
      `No primary email for", ${id}, ${firstName}, ${lastName}`
    );
  }
  return clerkUserPrimaryEmail;
}
