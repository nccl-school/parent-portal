import { href, useFetcher } from "react-router";
import { useCallback, useEffect, type ChangeEventHandler } from "react";
import { match } from "ts-pattern";
import { Callout } from "@nccl/components";

import { useDebounce } from "../../hooks/hook.useDebounce";
import { EmptyState } from "../../components/states/EmptyState";
import { LoadingState } from "../../components/states/LoadingState";
import { parseFetcherData } from "../../utils/client";
import type { loader } from "../../api/api.suggestion.getManyOrCreateUnique";
import {
  Suggestion,
  SuggestionSearch,
  SuggestionItem,
  SuggestionAdd,
} from "../suggestion";

export function HomeSuggestions() {
  const { load, data, submit } = useFetcher<typeof loader>();
  const { debounce } = useDebounce();

  useEffect(() => {
    load(href("/api/suggestion"));
  }, [load]);

  const res = parseFetcherData(data);

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const form = e.currentTarget.form;
      debounce(() => {
        submit(form);
      }, 300);
    },
    [debounce, submit]
  );

  return (
    <Suggestion>
      <form method="get" action="/api/suggestion">
        <SuggestionSearch name="search" onChange={handleSearch} />
      </form>
      <ul>
        {match(res)
          .with({ status: "loading" }, () => {
            return <LoadingState>Loading suggestions...</LoadingState>;
          })
          .with({ status: "error" }, () => {
            return (
              <Callout
                variant="danger"
                description="There was error when trying to fetch the suggestions"
              />
            );
          })
          .with({ status: "ok" }, ({ data = [] }) => {
            if (data.length === 0) {
              return (
                <EmptyState
                  imgSrc="/images/image-icon-wizard.png"
                  imgAlt="wizard"
                  title="No suggestions found"
                >
                  We can't find any suggestions matching your search criteria.
                  Refine your search or create a new suggestion.
                </EmptyState>
              );
            }
            return (data ?? []).map((suggestion) => (
              <li key={suggestion.id}>
                <SuggestionItem {...suggestion} />
              </li>
            ));
          })
          .exhaustive()}
      </ul>
      <SuggestionAdd />
    </Suggestion>
  );
}
