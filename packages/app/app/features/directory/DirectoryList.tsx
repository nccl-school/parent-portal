import type { GetDirectoryResponse } from "@nccl/api/client";
import { css } from "@linaria/core";
import { makeRem, makeReset } from "@nccl/theme";

import { DirectoryListItem } from "./DirectoryListItem";

const styles = css`
  ${makeReset("ul")};
  padding-bottom: ${makeRem(24)};
`;

export function DirectoryList(users: GetDirectoryResponse) {
  return (
    <ul className={styles}>
      {users.map((user) => (
        <li key={user.id}>
          <DirectoryListItem {...user} />
        </li>
      ))}
    </ul>
  );
}
