import type { GetUserResponse } from "@nccl/api/client";
import type { MouseEvent } from "react";

export type AdminUserPermissionsModalState = {
  user: GetUserResponse;
};

export type LaunchAdminUserPermissionsModal = (
  e: MouseEvent<HTMLButtonElement>,
  state: AdminUserPermissionsModalState
) => void;
