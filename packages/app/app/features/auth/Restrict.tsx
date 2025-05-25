import { useAuth } from "@clerk/react-router";
import type { ReactNode } from "react";

import type { Roles } from "../../global";

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
  const { sessionClaims } = useAuth();
  if (sessionClaims?.metadata.role !== role) return null;
  return <>{children}</>;
}
