import { createClerkClient } from "@clerk/react-router/api.server";
import { getAuth } from "@clerk/react-router/ssr.server";
import type { AppLoadContext, LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";

export async function ensureUser<T extends LoaderFunctionArgs>(args: T) {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in?redirect_url=" + args.request.url);
  }
  return userId;
}

export async function getCurrentUser<
  A extends LoaderFunctionArgs<AppLoadContext>,
>(args: A) {
  const userId = await ensureUser(args); // guaranteed to return or throw
  const clerkClient = await getClerkClient(args);
  return clerkClient.users.getUser(userId);
}

export async function getClerkClient<
  A extends LoaderFunctionArgs<AppLoadContext>,
>(args: A) {
  // Instantiate the Backend SDK and get the user's full `Backend User` object
  const client = createClerkClient({
    secretKey: args.context.env.CLERK_SECRET_KEY,
  });
  return client;
}
