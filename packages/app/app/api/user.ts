import type { Route } from "./+types/user";

import { getClerkClient } from "../utils/server";

export async function loader(loaderArgs: Route.LoaderArgs) {
  const clerkClient = await getClerkClient(loaderArgs);
  const user = await clerkClient.users.getUser(loaderArgs.params.id);
  return {
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
}
