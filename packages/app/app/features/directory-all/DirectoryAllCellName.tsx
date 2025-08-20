import { css } from "@linaria/core";
import type { GetDirectoryResponse } from "@nccl/api/client";
import { Avatar, Typography } from "@nccl/components";
import { makeRem } from "@nccl/theme";
import { match } from "ts-pattern";

const styles = css`
  display: grid;
  grid-template-areas:
    "avatar name"
    "avatar meta";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: ${makeRem(16)};
  align-items: start;
`;

const avatarStyles = css`
  grid-area: avatar;
`;
const nameStyles = css`
  grid-area: name;
`;
const metaStyles = css`
  grid-area: meta;
`;

export function DirectoryAllCellPerson(user: GetDirectoryResponse[0]) {
  return (
    <div className={styles}>
      <Avatar
        className={avatarStyles}
        dxFirstName={user.firstName}
        dxSize="xl"
        dxLastName={user.lastName}
        dxSrc={user.imageUrl ?? undefined}
        dxBgColor={"alt"}
      />
      <div className={nameStyles}>
        <Typography
          dxVariant="heading5"
          dxNode="span"
        >{`${user.firstName} ${user.lastName}`}</Typography>
      </div>
      <div className={metaStyles}>
        <Typography dxNode="span" dxVariant="body3">
          {match(user.role.id)
            .with("ADMIN", () => "Administrator")
            .with("USER", () => "Parent")
            .with("STAFF", () => "Staff / Teacher")
            .exhaustive()}
        </Typography>
      </div>
    </div>
  );
}
