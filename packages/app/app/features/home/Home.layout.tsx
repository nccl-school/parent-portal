import { Outlet, redirect } from "react-router";
import { useUser } from "@clerk/react-router";
import { getAuth } from "@clerk/react-router/ssr.server";

import type { Route } from "./+types/Home.layout";

import { PageHeader } from "../../components/page";

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

export default function HomeLayout() {
  const { user } = useUser();

  if (!user) return;

  return (
    <>
      <PageHeader dxTitle={`Welcome, ${user.firstName}!`} />
      <Outlet />
    </>
  );
}
