import {
  Avatar,
  Button,
  DescriptionList,
  DescriptionListData,
  DescriptionListTag,
  ModalBody,
  ModalController,
  ModalFooter,
  Typography,
  useModalContext,
} from "@nccl/components";
import { useEffect } from "react";
import { href, useFetcher } from "react-router";
import { css } from "@linaria/core";
import { makeColor, makeCustom, makeRem } from "@nccl/theme";

import { SuggestionViewComments } from "./SuggestionViewComments";

import { LoadingState } from "../../components/states/LoadingState";
import { dates, renderData } from "../../utils/client";
import type { loader } from "../../api/api.suggestion.getOrUpdateUnique";
import { getUserName } from "../user";

const styles = css`
  width: ${makeRem(520)};
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const titleStyles = css`
  margin: ${makeRem(24)} 0 ${makeRem(32)} 0;
`;

const descStyles = css`
  border: 1px solid ${makeColor("neutral-light-400")};
  border-radius: ${makeRem(8)};
  padding: ${makeRem(16)};
  margin-bottom: ${makeRem(32)};
`;

const commentsStyles = css`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  background: ${makeColor("neutral-light-100", { opacity: 0.3 })};
  padding: 0 ${makeCustom("modal--gutters")};

  & > *:first-child {
    padding: ${makeRem(24)} 0;
  }
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
  } = useModalContext<{ suggestion_id: string }>();
  const { load, data } = useFetcher<typeof loader>();

  useEffect(() => {
    load(href("/api/suggestion/:id", { id: suggestion_id }));
  }, [load, suggestion_id]);

  return (
    <>
      <ModalBody>
        <Typography dxVariant="heading4" dxNode="h5" className={titleStyles}>
          {renderData(data, { ok: (d) => d.title })}
        </Typography>
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
      <div className={commentsStyles}>
        <Typography dxVariant="heading5" dxNode="div">
          Comments (23)
        </Typography>
        {renderData(data, {
          loading: <LoadingState>Loading suggestion comments...</LoadingState>,
          ok: () => <SuggestionViewComments />,
        })}
      </div>
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
