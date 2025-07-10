import { css } from "@linaria/core";
import type { GetSuggestionListResponse } from "@nccl/api/client";
import { Icon, Typography } from "@nccl/components";
import { makeColor, makeRem, makeReset } from "@nccl/theme";
import { classes } from "@stratum-ui/core/utils";
import { href, useFetcher } from "react-router";

import { SuggestionViewDialog } from "../suggestion-view/SuggestionView";

export type SuggestionItemProps = {
  title: string;
  description: string;
  numOfLikes: number;
  numOfDislikes: number;
  numOfComments: number;
  id: string;
};

const styles = css`
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: ${makeRem(8)};
  margin-bottom: ${makeRem(4)};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: ${makeRem(24)} ${makeRem(8)};

  & .sg-count {
    width: ${makeRem(60)};
    text-align: center;
    display: grid;
    place-content: center;
  }

  & .sg-copy {
    overflow: hidden;
    padding-left: ${makeRem(16)};
    padding-right: ${makeRem(16)};
  }

  & .sg-title {
    margin-bottom: ${makeRem(4)};
    line-height: 1;
  }
  & .sg-description {
    color: ${makeColor("neutral-light-800")};
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  button {
    ${makeReset("button")};
    cursor: pointer;
  }

  & .sg-item {
    height: 100%;
    border-left: 1px solid ${makeColor("neutral-light-100")};
    display: flex;
    align-items: center;
    gap: ${makeRem(8)};
    color: ${makeColor("neutral-dark-200")} !important;
    padding: 0 ${makeRem(12)};
  }
`;

export function SuggestionItem({
  id,
  title,
  description,
  counts,
  current_user_vote,
}: GetSuggestionListResponse[0]) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      className={styles}
      action={href("/api/suggestion/:id/vote", { id })}
      method="POST"
    >
      <input name="suggestion_id" value={id} type="hidden" />
      <div className="sg-count">
        <div>
          <Typography dxVariant="heading3" dxNode="div">
            {counts.total}
          </Typography>
          <Typography
            dxVariant="caption"
            dxNode="div"
            style={{ textTransform: "uppercase" }}
          >
            {counts.total > 1 ? "votes" : "vote"}
          </Typography>
        </div>
      </div>
      <div className="sg-copy">
        <Typography dxNode="div" dxVariant="heading5" className="sg-title">
          {title}
        </Typography>
        <Typography dxNode="div" dxVariant="body1" className="sg-description">
          {description}
        </Typography>
      </div>
      <button className="sg-item" value="LIKE" name="type">
        <Icon
          dxIcon={
            current_user_vote === "LIKE"
              ? "thumbs-up-solid-standard"
              : "thumbs-up-stroke-standard"
          }
          dxSize={24}
          dxColor={
            current_user_vote === "LIKE" ? "success-700" : "neutral-light-500"
          }
        />
        <Typography dxVariant="label" dxNode="div">
          {counts.likes}
        </Typography>
      </button>
      <button className="sg-item" value="DISLIKE" name="type">
        <Icon
          dxIcon={
            current_user_vote === "DISLIKE"
              ? "thumbs-down-solid-standard"
              : "thumbs-down-stroke-standard"
          }
          dxSize={24}
          dxColor={
            current_user_vote === "DISLIKE" ? "danger-700" : "neutral-light-500"
          }
        />
        <Typography dxVariant="label" dxNode="div">
          {counts.dislikes}
        </Typography>
      </button>
      <button
        className={classes("sg-item", "cm")}
        type="button"
        onClick={(e) => SuggestionViewDialog.launch(e, { suggestion_id: id })}
      >
        <Icon dxIcon="comment-01-stroke-standard" dxSize={18} />
        <Typography dxNode="div" dxVariant="label">
          {counts.comments}
        </Typography>
      </button>
    </fetcher.Form>
  );
}
