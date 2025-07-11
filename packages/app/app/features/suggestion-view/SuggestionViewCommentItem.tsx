import { forwardRef, type JSX } from "react";
import type { GetSuggestionCommentsResponse, User } from "@nccl/api/client";
import { classes } from "@stratum-ui/core/utils";
import { css } from "@linaria/core";
import { Avatar, Button, Typography } from "@nccl/components";
import { makeColor, makeFontWeight, makeRem } from "@nccl/theme";
import { useUser } from "@clerk/react-router";

import { getUserName } from "../user";
import { dates } from "../../utils/client";

export type SuggestionViewCommentItemPropsNative = JSX.IntrinsicElements["div"];
export type SuggestionViewCommentItemPropsCustom = {
  comment: GetSuggestionCommentsResponse[0];
};
export type SuggestionViewCommentItemProps =
  SuggestionViewCommentItemPropsNative & SuggestionViewCommentItemPropsCustom;

const styles = css`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "avatar name time edit"
    ". comment comment comment"
    "actions actions actions actions";
  column-gap: ${makeRem(12)};
  margin: ${makeRem(20)} 0;
  padding-top: ${makeRem(20)};

  & + & {
    border-top: 1px solid ${makeColor("neutral-light-100")};
  }
  .avatar {
    grid-area: avatar;
    align-content: center;
  }
  .name {
    grid-area: name;
    align-content: center;
    & > * {
      font-weight: ${makeFontWeight("body-bold")} !important;
    }
  }
  .time {
    grid-area: time;
    color: ${makeColor("neutral-light-1000")} !important;
    & > * {
      font-weight: ${makeFontWeight("body-regular")} !important;
    }
    align-content: center;
  }
  .edit {
    grid-area: edit;
    align-content: center;
    display: flex;
    gap: ${makeRem(4)};
    justify-content: flex-end;
  }
  .comment {
    grid-area: comment;
    background: white;
  }
  .actions {
    grid-area: actions;
  }
`;

export const SuggestionViewCommentItem = forwardRef<
  HTMLDivElement,
  SuggestionViewCommentItemProps
>(function SuggestionViewCommentItem(
  { children, className, comment, ...restProps },
  ref
) {
  const { user } = useUser();
  return (
    <div {...restProps} className={classes(styles, className)} ref={ref}>
      <div className="avatar">
        <Avatar
          dxSize="lg"
          dxFirstName={comment.createdBy.firstName ?? ""}
          dxLastName={comment.createdBy.lastName ?? ""}
        />
      </div>
      <div className="name">
        <Typography dxNode="div" dxVariant="body1">
          {getUserName(
            // createdBy is a partial user
            comment.createdBy as User
          )}
        </Typography>
      </div>
      <div className="time">
        <Typography dxNode="div" dxVariant="label">
          {dates.format(comment.createdAt, "Relative")}
        </Typography>
      </div>
      <div className="edit">
        {comment.createdBy.extId === user?.id && (
          <Button
            dxVariant="icon"
            dxIcon="delete-02-stroke-standard"
            dxColor="danger"
            dxSize="sm"
          />
        )}
      </div>
      <div className="comment">
        <Typography dxVariant="body3" dxNode="div">
          {comment.comment}
        </Typography>
      </div>
      <div className="actions">{children}</div>
    </div>
  );
});
