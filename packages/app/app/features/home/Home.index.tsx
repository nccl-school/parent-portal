import { getAuth } from "@clerk/react-router/ssr.server";
import { Link, redirect } from "react-router";
import { SignOutButton } from "@clerk/react-router";

import type { Route } from "./+types/Home.index";

export function meta(metaArgs: Route.MetaArgs) {
  console.log({ metaArgs });
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(loaderArgs: Route.LoaderArgs) {
  // Use `getAuth()` to get the user's ID
  const { userId } = await getAuth(loaderArgs);
  // const product = await fakeDb.getProduct(params.pid);
  // return product;
  // Protect the route by checking if the user is signed in
  if (!userId) {
    return redirect("/sign-in?redirect_url=" + loaderArgs.request.url);
  }
}

export default function HomeIndexRoute() {
  return (
    <>
      <SignOutButton redirectUrl="/sign-in" />
      <Link to={"/sign-in"}>sign in</Link>
    </>
  );
}
