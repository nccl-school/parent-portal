import { css } from "@linaria/core";
import type { GetDirectoryResponse } from "@nccl/api/client";
import { Avatar, Icon, Typography } from "@nccl/components";
import { makeColor, makeRem } from "@nccl/theme";
import { href, Link } from "react-router";

import { RoleBadge } from "../user";

const styles = css`
  display: grid;
  grid-template-areas:
    "avatar name link"
    "avatar badge link";
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: ${makeRem(16)};
  align-items: center;
  background: ${makeColor("white")};
  padding: ${makeRem(16)};
  border-top: 1px solid ${makeColor("light-300")};

  text-decoration: none !important;
  color: ${makeColor("neutral-dark-900")};
`;

const avatarStyles = css`
  grid-area: avatar;
`;
const nameStyles = css`
  grid-area: name;

  & > .alt {
    color: ${makeColor("neutral-light-700")};
  }
`;
const linkStyles = css`
  grid-area: link;
`;

const badgeStyles = css`
  grid-area: badge;
  margin-top: ${makeRem(8)};
`;

export function DirectoryListItem(user: GetDirectoryResponse[0]) {
  return (
    <Link className={styles} to={href("/directory/:id", { id: user.id })}>
      <Avatar
        className={avatarStyles}
        dxFirstName={user.firstName}
        dxSize={64}
        dxLastName={user.lastName}
        dxSrc={user.imageUrl ?? undefined}
        dxBgColor={"alt"}
      />
      <div className={nameStyles}>
        <div className="name">
          <Typography
            dxVariant="heading5"
            dxNode="div"
          >{`${user.firstName} ${user.lastName}`}</Typography>
        </div>
        <Typography dxNode="div" dxVariant="body3" className="alt">
          {user.email}
        </Typography>
        <div className={badgeStyles}>
          <RoleBadge {...user} />
        </div>
      </div>
      <div className={linkStyles}>
        <Icon
          dxIcon="arrow-right-01-stroke-standard"
          dxColor="neutral-light-600"
          dxSize={24}
        />
      </div>
    </Link>
  );
}
