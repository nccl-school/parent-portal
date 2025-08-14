import { css } from "@linaria/core";
import {
  Card,
  InputSelect,
  Typography,
  useModalContext,
} from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { href, useFetcher } from "react-router";
import {
  resourceAccessPermissions,
  type GetResourceSchoolAccessRuleResponse,
} from "@nccl/api/client";
import { useEffect } from "react";
import { match } from "ts-pattern";

import type { ResourceActionAccessModalState } from "./resource-action-access.utils";

import { parseFetcherData } from "../../utils/client";

const cardStyles = css`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${makeRem(16)};
  align-items: center;
`;

export function ResourceActionAccessContentSchool() {
  const { state: resource } = useModalContext<ResourceActionAccessModalState>();

  const { load, data, submit } =
    useFetcher<GetResourceSchoolAccessRuleResponse | null>();

  useEffect(() => {
    load(href("/api/resource/:id/access/school", { id: resource.id }));
  }, [load, resource.id]);

  return (
    <Card dxVariant="contained" className={cardStyles}>
      <div>
        <Typography dxNode="div" dxVariant="heading5">
          Anyone in the school...
        </Typography>
        <Typography dxNode="p" dxVariant="body3">
          Includes any user that has access to the parent portal
        </Typography>
      </div>
      <form
        onChange={(e) =>
          submit(e.currentTarget, {
            method: "POST",
            action: href("/api/resource/:id/access/school", {
              id: resource.id,
            }),
          })
        }
      >
        {match(parseFetcherData(data))
          .with({ status: "loading" }, () => (
            <Typography dxVariant="caption" dxNode="div">
              Loading...
            </Typography>
          ))
          .with({ status: "error" }, () => (
            <Typography
              dxVariant="caption"
              dxNode="div"
              style={{ color: makeColor("danger") }}
            >
              There was an error loading the rules
            </Typography>
          ))
          .with({ status: "ok" }, (d) => {
            return (
              <>
                <input
                  type="hidden"
                  name="access-rule-id"
                  value={d.data?.id ?? ""}
                />
                <InputSelect
                  dxSize="md"
                  name="permission"
                  defaultValue={d.data?.permission ?? ""}
                >
                  <option value="">Cannot access</option>
                  <option value={resourceAccessPermissions.viewer}>
                    Can view
                  </option>
                  <option value={resourceAccessPermissions.editor}>
                    Can edit
                  </option>
                  <option value={resourceAccessPermissions.manager}>
                    Can manage
                  </option>
                </InputSelect>
              </>
            );
          })
          .exhaustive()}
      </form>
    </Card>
  );
}
