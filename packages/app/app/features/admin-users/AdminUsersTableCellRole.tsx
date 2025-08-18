import type { UserWithRole } from "@nccl/api/client";

import { RoleBadge } from "../user";

export function AdminUsersTableCellRole(user: UserWithRole) {
  return <RoleBadge {...user} />;
}
