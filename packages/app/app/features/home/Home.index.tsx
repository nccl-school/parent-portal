import { assembleTitle } from "../../utils/util.assemble-title";

export function meta() {
  return [
    { title: assembleTitle("Home") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomeIndexRoute() {
  return <>home</>;
}
