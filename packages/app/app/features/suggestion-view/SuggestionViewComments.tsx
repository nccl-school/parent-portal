import { css } from "@linaria/core";
import { InputTextarea, Typography } from "@nccl/components";
import { makeColor, makeCustom, makeRem, makeReset } from "@nccl/theme";
import { href, useFetcher } from "react-router";
import { useEffect } from "react";

import { SuggestionViewCommentItem } from "./SuggestionViewCommentItem";

import { LoadingState } from "../../components/states/LoadingState";
import type { loader } from "../../api/api.suggestion.comments.getManyOrCreateUnique";
import { renderData } from "../../utils/client";
import { MessageState } from "../../components/states/MessageState";

const commentsStyles = css`
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  /* background: ${makeColor("neutral-light-100", { opacity: 0.2 })}; */
  padding: 0 ${makeCustom("modal--gutters")};
  border-top: 1px solid ${makeColor("neutral-light-100")};

  & > *:first-child {
    padding: ${makeRem(24)} 0;
  }

  ul {
    ${makeReset("ul")};
  }
`;

export function SuggestionViewComments({
  suggestionId,
  commentCount,
}: {
  suggestionId: string;
  commentCount: number;
}) {
  const { load: fetchList, data: list } = useFetcher<typeof loader>();

  useEffect(() => {
    fetchList(href("/api/suggestion/:id/comment", { id: suggestionId }));
  }, [fetchList, suggestionId]);

  return (
    <div className={commentsStyles}>
      <Typography dxVariant="heading5" dxNode="div">
        {`Comments (${commentCount})`}
      </Typography>

      <div>
        <InputTextarea rows={3} dxVariant="contrasted" />
      </div>
      <ul>
        {renderData(list, {
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
    </div>
  );
}
