import { redirect } from "react-router";

import type { Route } from "./+types/api.auth.signOut";

import { getAuthClient } from "../utils/server";

export async function action(args: Route.ActionArgs) {
  const authClient = getAuthClient(args);
  await authClient.signOut();
  return redirect("/sign-in");
}
