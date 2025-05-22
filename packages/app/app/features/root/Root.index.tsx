import { Link } from "react-router";
import { SignOutButton } from "@clerk/react-router";

import type { Route } from "./+types/Root.index";

import { assembleTitle } from "../../utils/util.assemble-title";

export function meta(metaArgs: Route.MetaArgs) {
  console.log({ metaArgs });
  return [
    { title: assembleTitle("Home") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function RootIndexRoute() {
  return (
    <>
      <SignOutButton redirectUrl="/sign-in" />
      <Link to={"/sign-in"}>sign in</Link>
    </>
  );
}
