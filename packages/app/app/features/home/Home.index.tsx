import type { Route } from "./+types/Home.index";

import { PageHeader, PageSection } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";
import { getCurrentUser, getNCCLClient } from "../../utils/server";
import {
  Suggestion,
  SuggestionAdd,
  SuggestionItem,
  SuggestionSearch,
} from "../suggestion";

export function meta() {
  return [
    { title: assembleTitle("Home") },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader(loaderArgs: Route.LoaderArgs) {
  const ncclClient = getNCCLClient(loaderArgs);
  const suggestions = await ncclClient.suggestion.getSuggestionList();
  const user = await getCurrentUser(loaderArgs);
  return { firstName: user.firstName, suggestions };
}

export default function HomeIndexRoute({
  loaderData: { firstName, suggestions },
}: Route.ComponentProps) {
  return (
    <>
      <PageHeader dxTitle={`Welcome, ${firstName}!`} />
      <PageSection>
        <Suggestion>
          <SuggestionSearch />
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>
                <SuggestionItem {...suggestion} />
              </li>
            ))}
          </ul>
          <SuggestionAdd />
        </Suggestion>
      </PageSection>
      ;
    </>
  );
}
