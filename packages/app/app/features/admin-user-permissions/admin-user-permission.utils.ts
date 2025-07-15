import type { User } from "@nccl/api/client";
import type { MouseEvent } from "react";

export type AdminUserPermissionsModalState = {
  user: User;
};

export type LaunchAdminUserPermissionsModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserPermissionsModalState
) => void;
