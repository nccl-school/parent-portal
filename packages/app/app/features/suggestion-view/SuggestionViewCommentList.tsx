import { href, useFetcher } from "react-router";
import { useEffect } from "react";
import { css } from "@linaria/core";
import { makeReset } from "@nccl/theme";

import { SuggestionViewCommentItem } from "./SuggestionViewCommentItem";
import { useSuggestionViewModalContext } from "./suggestion-view.useSuggestionViewModalContext";

import type { loader } from "../../api/api.suggestion.comments.getManyOrCreateUnique";
import { LoadingState } from "../../components/states/LoadingState";
import { MessageState } from "../../components/states/MessageState";
import { renderData } from "../../utils/client";

const styles = css`
  ${makeReset("ul")};
`;

export function SuggestionViewCommentList() {
  const {
    state: { suggestion_id },
  } = useSuggestionViewModalContext();
  const { load, data } = useFetcher<typeof loader>();

  useEffect(() => {
    load(href("/api/suggestion/:id/comment", { id: suggestion_id }));
  }, [load, suggestion_id]);

  return (
    <ul className={styles}>
      {renderData(data, {
        loading: <LoadingState>Loading comments...</LoadingState>,
        ok: (data) => {
          if (data.length === 0) {
            return (
              <li>
                <MessageState>No comments have been created</MessageState>
              </li>
            );
          }
          return data.map((comment) => (
            <SuggestionViewCommentItem key={comment.id} comment={comment} />
          ));
        },
      })}
    </ul>
  );
}
