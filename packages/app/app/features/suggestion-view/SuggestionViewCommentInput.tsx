import {
  Button,
  getInputStyles,
  InputCheckbox,
  InputLabel,
  InputTextarea,
} from "@nccl/components";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";
import { useState } from "react";
import { href, useFetcher } from "react-router";
import type { CreateSuggestionCommentsResponse } from "@nccl/api/client";

import { useSuggestionViewModalContext } from "./suggestion-view.useSuggestionViewModalContext";

import type { action } from "../../api/api.suggestion.comments.getManyOrCreateUnique";
import { getValidationErrors } from "../../utils/client";

const styles = css`
  min-height: ${makeRem(200)};
  position: relative;

  .ta {
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    textarea {
      resize: none;
      padding-bottom: ${makeRem(44 + 8)} !important;
    }
  }

  .actions {
    position: absolute;
    bottom: 1px;
    left: 1px;
    right: 1px;
    height: auto;
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: ${makeRem(16)};
    align-items: center;
    padding: ${makeRem(8)};
    height: ${makeRem(44)};
    background: ${makeColor("neutral-light-100")};
    border-bottom-left-radius: ${makeRem(4)};
    border-bottom-right-radius: ${makeRem(4)};
  }
`;

function CommentBox({ onCancel }: { onCancel: () => void }) {
  const { state } = useSuggestionViewModalContext();

  const { Form, data } = useFetcher<typeof action>();
  const errors =
    getValidationErrors<keyof CreateSuggestionCommentsResponse>(data);

  return (
    <Form
      className={styles}
      method="POST"
      action={href("/api/suggestion/:id/comment", { id: state.suggestion_id })}
    >
      <InputTextarea
        dxVariant="contrasted"
        dxContainerClassName="ta"
        name="comment"
        dxError={errors.comment?.[0]}
      />
      <div className="actions">
        <div>
          <InputCheckbox dxLabelOrientation="after" name="isAnonymous">
            <InputLabel dxLabel="Submit anonymously" dxNode="div" />
          </InputCheckbox>
        </div>
        <Button
          dxSize="sm"
          dxVariant="outlined"
          dxColor="alt"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button dxSize="sm" dxVariant="contained" dxColor="alt" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export function SuggestionViewCommentInput() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        className={getInputStyles({ dxVariant: "contrasted" })}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Add comment...
      </button>
    );
  }
  return <CommentBox onCancel={() => setIsOpen(false)} />;
}
