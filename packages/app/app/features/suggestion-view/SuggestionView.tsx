import {
  Avatar,
  Button,
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  ModalBody,
  ModalController,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
  Typography,
} from "@nccl/components";
import { useEffect, useRef } from "react";
import { href, useFetcher } from "react-router";
import { css } from "@linaria/core";
import { makeColor, makeRem } from "@nccl/theme";

import { SuggestionViewComments } from "./SuggestionViewComments";
import { useSuggestionViewModalContext } from "./suggestion-view.useSuggestionViewModalContext";
import { SuggestionViewCommentInput } from "./SuggestionViewCommentInput";
import { SuggestionViewCommentList } from "./SuggestionViewCommentList";
import {
  CUSTOM_PROPERTY_TOP_POINT,
  SuggestionViewCommentsTitle,
} from "./SuggestionViewCommentsTitle";

import { dates, renderData } from "../../utils/client";
import type { loader } from "../../api/api.suggestion.getOrUpdateUnique";
import { getUserName } from "../user";

const styles = css`
  width: ${makeRem(520)};
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100%;
  overflow: auto;

  header {
    position: sticky;
    top: 0;
  }

  footer {
    position: sticky;
    bottom: 0;
  }
`;

const descStyles = css`
  border: 1px solid ${makeColor("neutral-light-100")};
  border-radius: ${makeRem(8)};
  padding: ${makeRem(16)};
  margin-bottom: ${makeRem(32)};
`;

export const SuggestionViewDialog = new ModalController<{
  suggestion_id: string;
}>({
  props: {
    dxVariant: "drawer-rtl",
    className: styles,
  },
  ModalContent,
});

function ModalContent() {
  const {
    close: closeModal,
    state: { suggestion_id },
  } = useSuggestionViewModalContext();
  const { load, data } = useFetcher<typeof loader>();
  const modalHeaderRef = useRef<HTMLElement | null>(null);
  const commentTitleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modalHeaderRef.current || !commentTitleRef.current) return;
    commentTitleRef.current.style.setProperty(
      CUSTOM_PROPERTY_TOP_POINT,
      makeRem(modalHeaderRef.current.clientHeight)
    );
  });

  useEffect(() => {
    load(href("/api/suggestion/:id", { id: suggestion_id }));
  }, [load, suggestion_id]);

  return (
    <>
      <ModalHeader ref={modalHeaderRef}>
        <ModalHeaderTitle>
          {renderData(data, { ok: (d) => d.title })}
        </ModalHeaderTitle>
      </ModalHeader>
      <ModalBody>
        <DescriptionList>
          <DescriptionListTag>Created on</DescriptionListTag>
          <DescriptionListData>
            {renderData(data, {
              ok: (d) => dates.format(d.createdAt, "Relative"),
            })}
          </DescriptionListData>
          <DescriptionListTag>Author</DescriptionListTag>
          <DescriptionListData>
            {renderData(data, {
              ok: (d) => (
                <div
                  style={{
                    display: "flex",
                    gap: makeRem(8),
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    dxSize="md"
                    dxFirstName={d.createdBy.firstName ?? ""}
                    dxLastName={d.createdBy.lastName ?? ""}
                  />
                  <Typography dxVariant="body3" dxNode="span">
                    {getUserName(d.createdBy)}
                  </Typography>
                </div>
              ),
            })}
          </DescriptionListData>
        </DescriptionList>
        <Typography
          dxVariant="body3"
          dxNode="div"
          style={{
            color: makeColor("neutral-light-900"),
            marginTop: makeRem(20),
            marginBottom: makeRem(8),
          }}
        >
          Description
        </Typography>
        <Typography dxVariant="body3" dxNode="div" className={descStyles}>
          {renderData(data, {
            ok: (d) => d.description,
          })}
        </Typography>
      </ModalBody>

      <SuggestionViewComments>
        <SuggestionViewCommentsTitle
          ref={commentTitleRef}
          numOfComments={
            renderData(data, {
              loading: 0,
              ok: (d) => d.numOfComments,
            }) as number
          }
        />
        <SuggestionViewCommentInput />
        <SuggestionViewCommentList />
      </SuggestionViewComments>

      <ModalFooter>
        <Button
          dxVariant="outlined"
          dxColor="secondary"
          dxSize="md"
          type="button"
          onClick={closeModal}
        >
          close
        </Button>
      </ModalFooter>
    </>
  );
}
