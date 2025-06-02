import { getAuth } from "@clerk/react-router/ssr.server";
import { data, redirect, type LoaderFunctionArgs } from "react-router";
import { createClerkClient } from "@clerk/react-router/api.server";

export async function ensureUser<T extends LoaderFunctionArgs>(args: T) {
  // Use `getAuth()` to get the user's ID
  const { userId } = await getAuth(args);

  // Protect the route by checking if the user is signed in
  if (!userId) {
    redirect("/sign-in?redirect_url=" + args.request.url);
  }
}

export async function getClerkClient<A extends LoaderFunctionArgs>(args: A) {
  // Instantiate the Backend SDK and get the user's full `Backend User` object
  const client = createClerkClient({
    secretKey: args.context.cloudflare.env.CLERK_SECRET_KEY,
  });
  return client;
}

export async function getCurrentUser<A extends LoaderFunctionArgs>(args: A) {
  await ensureUser(args);
  const clerkClient = await getClerkClient(args);
  const { userId } = await getAuth(args);
  if (!userId) {
    throw new Error("Unable to get current user");
  }
  const user = await clerkClient.users.getUser(userId);
  return user;
}

export class ErrorForbidden extends Error {
  status = 403;
  name = "ErrorForbidden";

  constructor(message = "You do not have permission to access this resource.") {
    super(message);
    Object.setPrototypeOf(this, ErrorForbidden.prototype);
  }
}

export function handleError(error: unknown) {
  console.error(error);
  if (error instanceof ErrorForbidden) {
    return data({ message: error.message, status: error.status });
  }
  if (error instanceof Error) {
    return data({
      message: error.message ?? "An unknown error occurred.",
      status: 500,
    });
  }
}
