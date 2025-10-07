import { redirect } from "react-router";

import type { Route } from "./+types/api.auth.signOut";

export async function action(args: Route.ActionArgs) {
  const authClient = args.context.resolve("ncclClient");
  await authClient.auth.signOut();
  return redirect("/sign-in");
}
