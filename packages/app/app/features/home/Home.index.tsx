import { NCCLClient } from "@nccl/api/client";

import type { Route } from "./+types/Home.index";

import { PageHeader, PageSection } from "../../components/page";
import { assembleTitle } from "../../utils/util.assemble-title";
import { getCurrentUser } from "../../utils/server";
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
  console.log({ NCCLClient });
  const user = await getCurrentUser(loaderArgs);
  return { firstName: user.firstName };
}

export default function HomeIndexRoute({
  loaderData: { firstName },
}: Route.ComponentProps) {
  return (
    <>
      <PageHeader dxTitle={`Welcome, ${firstName}!`} />
      <PageSection>
        <Suggestion>
          <SuggestionSearch />
          <ul>
            <li>
              <SuggestionItem
                title="Cursus Nullam Commodo Tortor Cras"
                description="Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Cras mattis consectetur purus sit amet fermentum."
                voteCount={10}
              />
            </li>
            <li>
              <SuggestionItem
                title="Cursus Nullam Commodo Tortor Cras"
                description="Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Cras mattis consectetur purus sit amet fermentum."
                voteCount={10}
              />
            </li>
            <li>
              <SuggestionItem
                title="Cursus Nullam Commodo Tortor Cras"
                description="Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Cras mattis consectetur purus sit amet fermentum."
                voteCount={10}
              />
            </li>

            <li>
              <SuggestionItem
                title="Cursus Nullam Commodo Tortor Cras"
                description="Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Cras mattis consectetur purus sit amet fermentum."
                voteCount={10}
              />
            </li>
          </ul>
          <SuggestionAdd handleAddSuggestion={() => void 0} />
        </Suggestion>
      </PageSection>
      ;
    </>
  );
}
