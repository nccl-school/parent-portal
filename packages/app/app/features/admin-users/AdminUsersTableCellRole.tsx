import type { User } from "@nccl/api/client";

import { RoleBadge } from "../user";

export function AdminUsersTableCellRole(user: User) {
  return <RoleBadge {...user} />;
}
