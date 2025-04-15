import type { Route } from "./+types/Landing.route";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LandingRoute() {
  return <Link to={"/sign-in"}>sign in</Link>;
}
