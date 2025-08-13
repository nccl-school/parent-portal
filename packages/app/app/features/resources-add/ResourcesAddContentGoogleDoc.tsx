import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import {
  Button,
  FormGroup,
  InputText,
  useModalContext,
} from "@nccl/components";
import { match } from "ts-pattern";
import { href, useFetcher } from "react-router";
import { useImmer } from "use-immer";
import { useEffect } from "react";

import { ResourcesAddedList } from "./ResourcesAddedList";
import {
  ResourcesAddedListItemGoogleDoc,
  type ResourcesAddedListItemGoogleDocProps,
} from "./ResourcesAddedListItemGoogleDoc";
import type { ResourcesAddModalState } from "./resources-add.utils";

import { LoadingState } from "../../components/states/LoadingState";
import { parseFetcherData } from "../../utils/client";

const styles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: ${makeRem(16)};
`;

export function ResourcesAddContentGoogleDoc() {
  const {
    state: { initParentResourceId },
  } = useModalContext<ResourcesAddModalState>();
  const [docs, setDocs] = useImmer<ResourcesAddedListItemGoogleDocProps[]>([]);
  const { Form, data, state } = useFetcher();

  const isLoading = state !== "idle";

  useEffect(() => {
    if (!data) return;
    const res = parseFetcherData(data);
    switch (res.status) {
      case "ok":
        setDocs((draft) => {
          draft.push(data);
        });
        break;

      case "error":
        console.log(res.error);
        break;

      case "loading":
      default:
        break;
    }
  }, [data, setDocs]);

  return (
    <>
      <FormGroup
        dxTitle="1. Google Doc URL"
        dxSubtitle="Copy and paste the Google Doc URL into the input below to auto upload the doc."
      >
        <Form
          action={href("/api/resource/google-doc/load")}
          method="POST"
          className={styles}
        >
          <input
            type="hidden"
            value={initParentResourceId}
            name="parentResourceId"
          />
          <InputText
            name="url"
            dxLabel="Google Doc Share URL"
            dxSize="md"
            type="url"
          />
          <Button
            dxColor="primary"
            dxSize="md"
            dxVariant="outlined"
            dxStartIcon="tick-01-solid-standard"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Upload"}
          </Button>
        </Form>
      </FormGroup>
      <FormGroup dxTitle="2. Manage added Google Docs">
        <ResourcesAddedList>
          {match(docs)
            .with([], () => <LoadingState>Nothing added yet</LoadingState>)
            .otherwise((d) =>
              d.map((doc) => (
                <li key={doc.id}>
                  <ResourcesAddedListItemGoogleDoc {...doc} />
                </li>
              ))
            )}
        </ResourcesAddedList>
      </FormGroup>
    </>
  );
}
