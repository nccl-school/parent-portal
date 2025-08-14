import type { GetUserListResponse } from "@nccl/api/client";
import {
  Avatar,
  InputCombobox,
  Typography,
  type InputComboboxComponent,
} from "@nccl/components";
import { memo, useEffect, useState } from "react";
import { href, useFetcher } from "react-router";
import { css } from "@linaria/core";
import { makeRem, makeColor } from "@nccl/theme";

import { getUserName } from "./user.utils";

import { isError } from "../../utils/client";

type UserOption = GetUserListResponse[0] & {
  id: string;
  value: string;
  label: string;
};

export function UserCombobox({ onSelect: _ }: { onSelect: () => void }) {
  const [users, setUsers] = useState<UserOption[]>([]);
  const { data, load } = useFetcher<GetUserListResponse>();

  useEffect(() => {
    load(href("/api/user"));
  }, [load]);

  useEffect(() => {
    if (!data || isError(data)) return;
    console.log({ users: data });
    setUsers(
      data.map((user) => ({
        ...user,
        value: user.id,
        label: getUserName(user),
      }))
    );
  }, [data]);

  return (
    <InputCombobox
      name="user"
      dxLabel="Select a user"
      dxPlaceholder="Click to search"
      dxOptions={users}
      dxSearchKeys={["firstName", "lastName", "email"]}
      DXListComponent={ListComponent}
    />
  );
}

const componentStyles = css`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: center;
  text-align: left;
  padding: ${makeRem(8)};

  &:hover {
    background-color: ${makeColor("hover-100")};
  }
`;

const ListComponent: InputComboboxComponent<UserOption> = memo(
  function InputComboboxComponent(user) {
    return (
      <div className={componentStyles}>
        <Avatar
          dxFirstName={String(user.firstName)}
          dxSize="lg"
          dxSrc={user.imageUrl ?? undefined}
          dxLastName={user.lastName ?? undefined}
        />
        <Typography dxVariant="body3" dxNode="div">
          {user.label}
        </Typography>
      </div>
    );
  }
);
