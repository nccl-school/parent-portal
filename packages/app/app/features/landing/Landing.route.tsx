import { SignIn } from "@clerk/react-router";
import { css } from "@linaria/core";
import type { Route } from "./+types/Landing.route";
import { Link } from "react-router";

const styles = css`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr minmax(auto, max-content);
`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LandingRoute() {
  return <Link to={"/sign-in"}>sign in</Link>;
}
