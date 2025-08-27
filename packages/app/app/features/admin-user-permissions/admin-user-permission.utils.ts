import type { UserWithRole } from "@nccl/api/client";
import type { MouseEvent } from "react";

export type AdminUserPermissionsModalState = {
  user: UserWithRole;
};

export type LaunchAdminUserPermissionsModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserPermissionsModalState
) => void;
