import { css } from "@linaria/core";
import type { User } from "@nccl/api/client";
import { Avatar, Typography } from "@nccl/components";
import { makeFontWeight, makeRem } from "@nccl/theme";

import { getUserName } from "../user";

const styles = css`
  display: grid;
  grid-template-columns: min-content auto;
  grid-area: auto auto;
  column-gap: ${makeRem(16)};
  grid-template-areas:
    "avatar name"
    "avatar email";

  .avatar {
    grid-area: avatar;
  }

  .name {
    grid-area: name;
    font-weight: ${makeFontWeight("body-bold")};
  }

  .email {
    grid-area: email;
  }
`;

export function AdminUsersTableCellName(user: User) {
  return (
    <div className={styles}>
      <Avatar
        className="avatar"
        dxFirstName={user.firstName ?? ""}
        dxSize={"lg"}
        dxLastName={user.lastName ?? ""}
        dxSrc={user.imageUrl ?? undefined}
      />
      <Typography dxVariant="body1" dxNode="div" className="name">
        {getUserName(user)}
      </Typography>
      <Typography dxVariant="body3" dxNode="div" className="email">
        {user.email ?? "No email address"}
      </Typography>
    </div>
  );
}
