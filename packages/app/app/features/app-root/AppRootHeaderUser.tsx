import { css } from "@linaria/core";
import { Avatar } from "@nccl/components";
import { makeReset } from "@nccl/theme";
import { href, Link } from "react-router";

import { useUser } from "../../hooks/hook.useUser";

const styles = css`
  width: 100%;
  height: 100%;
  ${makeReset("anchor")};
  display: grid;
  place-content: center;
`;

export function AppRootHeaderUser() {
  const user = useUser();

  return (
    <Link to={href("/profile/*", { "*": "" })} className={styles}>
      <Avatar
        dxSize="xl"
        dxSrc={user?.imageUrl ?? undefined}
        dxFirstName={user?.firstName ?? ""}
        dxLastName={user?.lastName ?? undefined}
      />
    </Link>
  );
}
