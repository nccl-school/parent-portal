import type { MouseEvent } from "react";

export type AdminUserPermissionsModalState = {
  userId: string;
};

export type LaunchAdminUserPermissionsModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserPermissionsModalState
) => void;
