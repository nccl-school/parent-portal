import { getAuth } from "@clerk/react-router/ssr.server";
import { data, redirect, type LoaderFunctionArgs } from "react-router";
import { createClerkClient } from "@clerk/react-router/api.server";

export async function ensureUser<T extends LoaderFunctionArgs>(args: T) {
  const { userId } = await getAuth(args);
  if (!userId) {
    throw redirect("/sign-in?redirect_url=" + args.request.url);
  }
  return userId;
}

export async function getClerkClient<A extends LoaderFunctionArgs>(args: A) {
  // Instantiate the Backend SDK and get the user's full `Backend User` object
  const client = createClerkClient({
    secretKey: args.context.cloudflare.env.CLERK_SECRET_KEY,
  });
  return client;
}

export async function getCurrentUser<A extends LoaderFunctionArgs>(args: A) {
  const userId = await ensureUser(args); // guaranteed to return or throw
  const clerkClient = await getClerkClient(args);
  return clerkClient.users.getUser(userId);
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
