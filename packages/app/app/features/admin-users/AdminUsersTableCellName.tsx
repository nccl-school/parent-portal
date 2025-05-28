import type { User } from "@clerk/react-router/ssr.server";
import { css } from "@linaria/core";
import { Avatar, Typography } from "@nccl/components";
import { makeFontWeight, makeRem } from "@nccl/theme";

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
    font-size: ${makeRem(18)};
  }

  .email {
    grid-area: email;
  }
`;

export function AdminUsersTableCellName(
  user: Pick<User, "firstName" | "lastName" | "emailAddresses" | "imageUrl">
) {
  return (
    <div className={styles}>
      <Avatar
        className="avatar"
        dxFirstName={user.firstName ?? ""}
        dxSize={"xl"}
        dxLastName={user.lastName ?? ""}
        dxSrc={user.imageUrl}
      />
      <Typography
        dxVariant="body1"
        dxNode="div"
        className="name"
      >{`${user.firstName} ${user.lastName}`}</Typography>
      <Typography dxVariant="body2" dxNode="div" className="email">
        {user.emailAddresses[0].emailAddress ?? "No email address"}
      </Typography>
    </div>
  );
}
