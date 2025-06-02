import type { Route } from "./+types/Home.index";

import { PageHeader, PageSection } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";
import { getCurrentUser } from "../../utils/server";

export function meta() {
  return [
    { title: assembleTitle("Home") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(loaderArgs: Route.LoaderArgs) {
  const user = await getCurrentUser(loaderArgs);
  return { firstName: user.firstName };
}

export default function HomeIndexRoute({
  loaderData: { firstName },
}: Route.ComponentProps) {
  return (
    <>
      <PageHeader dxTitle={`Welcome, ${firstName}!`} />
      <PageSection>content</PageSection>;
    </>
  );
}
