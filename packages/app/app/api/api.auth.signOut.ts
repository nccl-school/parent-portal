import { redirect } from "react-router";

import type { Route } from "./+types/api.auth.signOut";

import { getNCCLClient } from "../utils/server";

export async function action(args: Route.ActionArgs) {
  const authClient = getNCCLClient(args);
  await authClient.auth.signOut();
  return redirect("/sign-in");
}
