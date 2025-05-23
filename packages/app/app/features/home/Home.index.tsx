import type { Route } from "../../+types/root";
import { assembleTitle } from "../../utils/util.assemble-title";

export function meta(metaArgs: Route.MetaArgs) {
  console.log({ metaArgs });
  return [
    { title: assembleTitle("Home") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeIndexRoute() {
  return <>home</>;
}
