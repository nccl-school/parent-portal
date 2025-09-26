import { css } from "@linaria/core";
import { makeRem } from "@nccl/theme";
import {
  Button,
  FormGroup,
  InputText,
  Toaster,
  useModalContext,
} from "@nccl/components";
import { match } from "ts-pattern";
import { href, useFetcher } from "react-router";
import { useImmer } from "use-immer";
import { useEffect } from "react";

import { ResourceAddedList } from "./ResourceAddedList";
import {
  ResourceAddedListItemGoogleDoc,
  type ResourceAddedListItemGoogleDocProps,
} from "./ResourceAddedListItemGoogleDoc";
import type { ResourceAddModalState } from "./resources-add.utils";

import { LoadingState } from "../../components/states/LoadingState";
import { parseFetcherData } from "../../utils/client";

const styles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: ${makeRem(16)};
`;

export function ResourceAddContentGoogleDoc() {
  const {
    state: { initParentResourceId },
  } = useModalContext<ResourceAddModalState>();
  const [docs, setDocs] = useImmer<ResourceAddedListItemGoogleDocProps[]>([]);
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
        Toaster.launch({
          variant: "error",
          message: res.error.message,
          dismiss: "manual",
        });
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
        <ResourceAddedList>
          {match(docs)
            .with([], () => <LoadingState>Nothing added yet</LoadingState>)
            .otherwise((d) =>
              d.map((doc) => (
                <li key={doc.id}>
                  <ResourceAddedListItemGoogleDoc {...doc} />
                </li>
              ))
            )}
        </ResourceAddedList>
      </FormGroup>
    </>
  );
}
