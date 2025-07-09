import { href, useFetcher } from "react-router";
import { useCallback, useEffect, useRef, type ChangeEventHandler } from "react";
import { match } from "ts-pattern";
import { Callout } from "@nccl/components";

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    load(href("/api/suggestion"));
  }, [load]);

  const res = parseFetcherData(data);

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const form = e.currentTarget.form;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        submit(form);
      }, 300);
    },
    [submit]
  );

  return (
    <Suggestion>
      <form method="get" action="/api/suggestion">
        <SuggestionSearch name="search" onChange={handleSearch} />
      </form>
      <ul>
        {match(res)
          .with({ status: "loading" }, () => {
            return <div>Loading...</div>;
          })
          .with({ status: "error" }, () => {
            return (
              <Callout
                variant="danger"
                description="There was error when trying to fetch the suggestions"
              />
            );
          })
          .with({ status: "ok" }, (state) => {
            return (state.data ?? []).map((suggestion) => (
              <li key={suggestion.id}>
                <SuggestionItem {...suggestion} />
              </li>
            ));
          })
          .exhaustive()}
        {}
      </ul>
      <SuggestionAdd />
    </Suggestion>
  );
}
