import type { User } from "@clerk/react-router/ssr.server";

import { UserRoleBadge } from "../user";

export function AdminUsersTableCellRole(user: Pick<User, "publicMetadata">) {
  return <UserRoleBadge publicMetadata={user.publicMetadata} />;
}
