import type { Route } from "./+types/api.auth.signOut";

import { getAuthClient } from "../utils/server";

export async function action(args: Route.ActionArgs) {
  const authClient = getAuthClient();
  // BA usually clears via its own sign-out endpoint; you can proxy or call it directly:
  const res = await authClient.signOut({
    headers: args.request.headers,
    asResponse: true,
  });
  return res;
}
