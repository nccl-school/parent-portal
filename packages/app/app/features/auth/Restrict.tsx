import type { Roles } from "@nccl/api/client";
import type { ReactNode } from "react";

import { useUser } from "../../hooks/hook.useUser";

/**
 * Client side mechanism for preventing specific nodes from rendering. This is to
 * be used deeply nested in a component where it doesn't make sense to
 * do the RBAC on the server
 */
export function Restrict({
  children,
  role,
}: {
  children: ReactNode;
  role: Roles;
}) {
  const user = useUser();
  if (user?.role.id !== role) return null;
  return <>{children}</>;
}
